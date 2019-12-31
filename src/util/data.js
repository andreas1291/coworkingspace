import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import { sanitizeEntity } from './sanitize';

/**
 * Combine the given relationships objects
 *
 * See: http://jsonapi.org/format/#document-resource-object-relationships
 */
export const combinedRelationships = (oldRels, newRels) => {
  if (!oldRels && !newRels) {
    // Special case to avoid adding an empty relationships object when
    // none of the resource objects had any relationships.
    return null;
  }
  return { ...oldRels, ...newRels };
};

/**
 * Combine the given resource objects
 *
 * See: http://jsonapi.org/format/#document-resource-objects
 */
export const combinedResourceObjects = (oldRes, newRes) => {
  const { id, type } = oldRes;
  if (newRes.id.uuid !== id.uuid || newRes.type !== type) {
    throw new Error('Cannot merge resource objects with different ids or types');
  }
  const attributes = newRes.attributes || oldRes.attributes;
  const attrs = attributes ? { attributes: { ...attributes } } : null;
  const relationships = combinedRelationships(oldRes.relationships, newRes.relationships);
  const rels = relationships ? { relationships } : null;
  return { id, type, ...attrs, ...rels };
};

/**
 * Combine the resource objects form the given api response to the
 * existing entities.
 */
export const updatedEntities = (oldEntities, apiResponse) => {
  const { data, included = [] } = apiResponse;
  const objects = (Array.isArray(data) ? data : [data]).concat(included);

  const newEntities = objects.reduce((entities, curr) => {
    const { id, type } = curr;

    // Some entities (e.g. listing and user) might include extended data,
    // you should check if src/util/sanitize.js needs to be updated.
    const current = sanitizeEntity(curr);

    entities[type] = entities[type] || {};
    const entity = entities[type][id.uuid];
    entities[type][id.uuid] = entity ? combinedResourceObjects({ ...entity }, current) : current;

    return entities;
  }, oldEntities);

  return newEntities;
};

/**
 * Denormalise the entities with the resources from the entities object
 *
 * This function calculates the dernormalised tree structure from the
 * normalised entities object with all the relationships joined in.
 *
 * @param {Object} entities entities object in the SDK Redux store
 * @param {Array<{ id, type }} resources array of objects
 * with id and type
 * @param {Boolean} throwIfNotFound wheather to skip a resource that
 * is not found (false), or to throw an Error (true)
 *
 * @return {Array} the given resource objects denormalised that were
 * found in the entities
 */
export const denormalisedEntities = (entities, resources, throwIfNotFound = true) => {
  const denormalised = resources.map(res => {
    const { id, type } = res;
    const entityFound = entities[type] && id && entities[type][id.uuid];
    if (!entityFound) {
      if (throwIfNotFound) {
        throw new Error(`Entity with type "${type}" and id "${id ? id.uuid : id}" not found`);
      }
      return null;
    }
    const entity = entities[type][id.uuid];
    const { relationships, ...entityData } = entity;

    if (relationships) {
      // Recursively join in all the relationship entities
      return reduce(
        relationships,
        (ent, relRef, relName) => {
          // A relationship reference can be either a single object or
          // an array of objects. We want to keep that form in the final
          // result.
          const hasMultipleRefs = Array.isArray(relRef.data);
          const multipleRefsEmpty = hasMultipleRefs && relRef.data.length === 0;
          if (!relRef.data || multipleRefsEmpty) {
            ent[relName] = hasMultipleRefs ? [] : null;
          } else {
            const refs = hasMultipleRefs ? relRef.data : [relRef.data];

            // If a relationship is not found, an Error should be thrown
            const rels = denormalisedEntities(entities, refs, true);

            ent[relName] = hasMultipleRefs ? rels : rels[0];
          }
          return ent;
        },
        entityData
      );
    }
    return entityData;
  });
  return denormalised.filter(e => !!e);
};

/**
 * Denormalise the data from the given SDK response
 *
 * @param {Object} sdkResponse response object from an SDK call
 *
 * @return {Array} entities in the response with relationships
 * denormalised from the included data
 */
export const denormalisedResponseEntities = sdkResponse => {
  const apiResponse = sdkResponse.data;
  const data = apiResponse.data;
  const resources = Array.isArray(data) ? data : [data];

  if (!data || resources.length === 0) {
    return [];
  }

  const entities = updatedEntities({}, apiResponse);
  return denormalisedEntities(entities, resources);
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} transaction entity object, which is to be ensured against null values
 */
export const ensureTransaction = (transaction, booking = null, listing = null, provider = null) => {
  const empty = {
    id: null,
    type: 'transaction',
    attributes: {},
    booking,
    listing,
    provider,
  };
  return { ...empty, ...transaction };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} booking entity object, which is to be ensured against null values
 */
export const ensureBooking = booking => {
  const empty = { id: null, type: 'booking', attributes: {} };
  return { ...empty, ...booking };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} listing entity object, which is to be ensured against null values
 */
export const ensureListing = listing => {
  const empty = {
    id: null,
    type: 'listing',
    attributes: { publicData: {} },
    images: [],
  };
  return { ...empty, ...listing };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} listing entity object, which is to be ensured against null values
 */
export const ensureOwnListing = listing => {
  const empty = {
    id: null,
    type: 'ownListing',
    attributes: { publicData: {} },
    images: [],
  };
  return { ...empty, ...listing };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} user entity object, which is to be ensured against null values
 */
export const ensureUser = user => {
  const empty = { id: null, type: 'user', attributes: { profile: {} } };
  return { ...empty, ...user };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} current user entity object, which is to be ensured against null values
 */
export const ensureCurrentUser = user => {
  const empty = { id: null, type: 'currentUser', attributes: { profile: {} }, profileImage: {} };
  return { ...empty, ...user };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} time slot entity object, which is to be ensured against null values
 */
export const ensureTimeSlot = timeSlot => {
  const empty = { id: null, type: 'timeSlot', attributes: {} };
  return { ...empty, ...timeSlot };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} availability exception entity object, which is to be ensured against null values
 */
export const ensureDayAvailabilityPlan = availabilityPlan => {
  const empty = { type: 'availability-plan/day', entries: [] };
  return { ...empty, ...availabilityPlan };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} availability exception entity object, which is to be ensured against null values
 */
export const ensureAvailabilityException = availabilityException => {
  const empty = { id: null, type: 'availabilityException', attributes: {} };
  return { ...empty, ...availabilityException };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} stripeCustomer entity from API, which is to be ensured against null values
 */
export const ensureStripeCustomer = stripeCustomer => {
  const empty = { id: null, type: 'stripeCustomer', attributes: {} };
  return { ...empty, ...stripeCustomer };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} stripeCustomer entity from API, which is to be ensured against null values
 */
export const ensurePaymentMethodCard = stripePaymentMethod => {
  const empty = {
    id: null,
    type: 'stripePaymentMethod',
    attributes: { type: 'stripe-payment-method/card', card: {} },
  };
  const cardPaymentMethod = { ...empty, ...stripePaymentMethod };

  if (cardPaymentMethod.attributes.type !== 'stripe-payment-method/card') {
    throw new Error(`'ensurePaymentMethodCard' got payment method with wrong type.
      'stripe-payment-method/card' was expected, received ${cardPaymentMethod.attributes.type}`);
  }

  return cardPaymentMethod;
};

/**
 * Get the display name of the given user as string. This function handles
 * missing data (e.g. when the user object is still being downloaded),
 * fully loaded users, as well as banned users.
 *
 * For banned or deleted users, a translated name should be provided.
 *
 * @param {propTypes.user} user
 * @param {String} defaultUserDisplayName
 *
 * @return {String} display name that can be rendered in the UI
 */
export const userDisplayNameAsString = (user, defaultUserDisplayName) => {
  const hasAttributes = user && user.attributes;
  const hasProfile = hasAttributes && user.attributes.profile;
  const hasDisplayName = hasProfile && user.attributes.profile.displayName;

  if (hasDisplayName) {
    return user.attributes.profile.displayName;
  } else {
    return defaultUserDisplayName || '';
  }
};

/**
 * DEPRECATED: Use userDisplayNameAsString function or UserDisplayName component instead
 *
 * @param {propTypes.user} user
 * @param {String} bannedUserDisplayName
 *
 * @return {String} display name that can be rendered in the UI
 */
export const userDisplayName = (user, bannedUserDisplayName) => {
  console.warn(
    `Function userDisplayName is deprecated!
User function userDisplayNameAsString or component UserDisplayName instead.`
  );

  return userDisplayNameAsString(user, bannedUserDisplayName);
};

/**
 * Get the abbreviated name of the given user. This function handles
 * missing data (e.g. when the user object is still being downloaded),
 * fully loaded users, as well as banned users.
 *
 * For banned  or deleted users, a default abbreviated name should be provided.
 *
 * @param {propTypes.user} user
 * @param {String} defaultUserAbbreviatedName
 *
 * @return {String} abbreviated name that can be rendered in the UI
 * (e.g. in Avatar initials)
 */
export const userAbbreviatedName = (user, defaultUserAbbreviatedName) => {
  const hasAttributes = user && user.attributes;
  const hasProfile = hasAttributes && user.attributes.profile;
  const hasDisplayName = hasProfile && user.attributes.profile.abbreviatedName;

  if (hasDisplayName) {
    return user.attributes.profile.abbreviatedName;
  } else {
    return defaultUserAbbreviatedName || '';
  }
};

/**
 * A customizer function to be used with the
 * mergeWith function from lodash.
 *
 * Works like merge in every way exept that on case of
 * an array the old value is completely overridden with
 * the new value.
 *
 * @param {Object} objValue Value of current field, denoted by key
 * @param {Object} srcValue New value
 * @param {String} key Key of the field currently being merged
 * @param {Object} object Target object that is receiving values from source
 * @param {Object} source Source object that is merged into object param
 * @param {Object} stack Tracks merged values
 *
 * @return {Object} New value for objValue if the original is an array,
 * otherwise undefined is returned, which results in mergeWith using the
 * standard merging function
 */
export const overrideArrays = (objValue, srcValue, key, object, source, stack) => {
  if (isArray(objValue)) {
    return srcValue;
  }
};

/**
 * Humanizes a line item code. Strips the "line-item/" namespace
 * definition from the beginnign, replaces dashes with spaces and
 * capitalizes the first character.
 *
 * @param {string} code a line item code
 *
 * @return {string} returns the line item code humanized
 */
export const humanizeLineItemCode = code => {
  if (!/^line-item\/.+/.test(code)) {
    throw new Error(`Invalid line item code: ${code}`);
  }
  const lowercase = code.replace(/^line-item\//, '').replace(/-/g, ' ');

  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
};


export const getLocale = (config) => {
  let pathname = '';
  if (typeof window !== 'undefined') {
    // it's safe to use window now
    pathname = window.location.pathname
  }

  // console.log('index file pathname',pathname)

  const { languageCountryConfig } = config.custom
  const tempLocale = getLocaleFromUrl( pathname, languageCountryConfig )

  const locale =
    tempLocale === undefined? config.locale : tempLocale

  return locale
}


  /***************************************************/
  /*                                                 */
  /*         LANGUAGE SWITCH HELPER FUNCTIONS        */
  /*                                                 */
  /***************************************************/



  /**
   * Determine the locale info from the given URL
   *
   * @param {Object} url the given url
   *
   * @return {Blooean} return locale info if it can be extracted
   * from url or not then return undefined object
   *
   */

  export const getLocaleFromUrl = (url, langConfig) => {

    const locales = Object.values(langConfig)

    return url.split('/')
      .find(item => locales.includes(item));

  }

  /**
   * Determine the browser language code from the given string
   *
   * @param {String} param the given detected browser language code string
   *
   * @return {String} return the language standard code from the given string
   * e.g en-gb, we can get en execpt for '-gb'
   *
   */

  export const getLangCode = (param) => {

    return param.split('-')[0]

  }

   /**
   * Determine new url from the given original location and locale info
   *
   * @param {string} location the given original location info
   * @param {string} locale the given locale info
   *
   * @return {String} return new url that is converted according to
   * from the original url and locale info
   *
   */

  export const getNewUrlFromLocation = (location, locale) => {

    const { pathname, search } = location

    //  In general, we can get the locale info
    // in the beginning chunk of url...
    let subPaths = pathname.split('/');
        subPaths[1] = locale;

    return subPaths.join('/').concat(search)

  }

   /**
   * Determine the locale info from the given URL
   *
   * @param {String} url the given url
   *
   * @return {String} return the country code accoridng to language
   * that we can extract from the given url...
   *
   */
  export const getCountryCodeFromUrl = (pathname, langsConfig) => {

    const subPaths = pathname.split('/'); // we can extract language info from url..
    const countryCodes = Object.keys(langsConfig)
    const languages = Object.values(langsConfig)
    return countryCodes[languages.indexOf(subPaths[1].toLowerCase())]
  }


  /**
   * Determine the locale info from the given URL
   *
   * @param {Array} spokenlanguages the current user spoken languages
   * @param {Object} languageCountryConfig the given language config object
   *
   * @return {String} return the locale string if find, or not
   * we can return undefined object
   *
   */

  export const getUserLocaleFromSpokenLanguages = (spokenlanguages, spokenlanguagesConfig, languageCountryConfig) => {

    const spokenLangCodes = spokenlanguages.map(lang => {
      const temp = spokenlanguagesConfig.find(item => item.key === lang)
      return temp.code
    })

    const validLangCodes = spokenLangCodes.reduce((result, code) => {
      const isVaildCode =
        Object.values(languageCountryConfig).slice(1).find(item => item === code)

      if (isVaildCode){
        result.push(code)
      }

      return result
    }, [])

    if (validLangCodes.length) {
      return validLangCodes[0]
    } else {
      return Object.values(languageCountryConfig).slice(1)[0]
      // return false;
    }
  }



  /**
   * Get the lanuage label list
   *
   * @param {Object} langsConfig the given language config file
   *
   * @return {Object} return country name-language name Object
   *
   *
   */

  export const getLanguageLabels = (langsConfig, spokenlanguages, currentLocale = 'en') => {

    // we need to slice language list
    // cause the first thing is the temp lang...
    const keys = Object.keys(langsConfig).slice(1)
    const values = Object.values(langsConfig).slice(1)
    const updatedValues = values.map(item => {
      const lang = spokenlanguages.find(lang => lang.code === item)

      if ( currentLocale === 'en' ) {
        return lang.label
      } else {
        return lang[`label_${currentLocale}`]
      }
    })
    const updatedLanguageLabels = getCombineObjectWithKeysValues(keys, updatedValues)

    return updatedLanguageLabels
  }

  /**
   * Determine the locale info from the given URL
   *
   * @param {Array} keys the given key array
   * @param {Array} values the given value array
   *
   * @return {Object} return keys-values object
   *
   *
   */

  export const getCombineObjectWithKeysValues = (keys, values) => {

      var result = {};
      for (var i = 0; i < keys.length; i++)
           result[keys[i]] = values[i];
      return result;

  }

  /**
   * Get the services to show on the listings
   *
   * @param {Object} listingData Error that occurred
   *
   * @param {Object} preparedServices Additional data to be sent to Sentry
   */

  export const getPreparedServices = (listingData, config) => {

    //      DATA TYPE
    //
    // services: ['eletrician', 'account', 'Repair', ...];
    // listingData: {
    //   eletrician : ['eletrician1', 'eletrician2', 'eletrician3', ...];
    //   account : ['account1', 'account2', 'account3', ...];
    //   Repair : ['Repair1', 'Repair2', 'Repair3', ...];
    //    ...
    //  }

    const services = ['services'];
    const authorServices = [];

    services.forEach( index => {
      if( listingData ){
        const service = listingData[ index ];

        if( service && service !== undefined ){
          if ( typeof service === 'string' ) {
            authorServices.push( service );
          } else {
            service.forEach( subService => {
              authorServices.push( subService );
            })
          }
        }
      }
    })

    if(authorServices.length > 0){

      const authorServiceLabels = authorServices.map(item => {
        return getServiceLabel(item, config)
      })

      return {
        label: authorServices[0],
        cnt: authorServices.length - 1,
        detail: authorServices.length? authorServiceLabels.join(', '):''
      };

    }else{
      // default value
      return {
        label: 'Cleaner',
        cnt: 0,
        detail: 'Cleaner'
      };
    }
  }

  export const nationality = listingData => {

    if ( listingData ) {
      const { address } = listingData.location;

      if (  address && typeof address !== undefined ) {
        // e.g. post 12345, Lasvegas, Losangels, America, United States...
        // Get only ` United States`

        return address.split(',').pop();
      }
    } else {
      // default value
      return 'Not Defined';
    }
  }

  export const getServiceLabel = ( key, config) => {
    const locale = getLocale(config)
    const serviceConfig = config.custom.services
    const hyperCategory = key.split('-')
    const isSubCategory = hyperCategory.length > 1
    const cateogryKey = hyperCategory[0]
    const subCategoryKey = isSubCategory?hyperCategory[1]:null
    console.log('getServiceLabel', key, subCategoryKey, isSubCategory)
    let serviceObj = serviceConfig.find(item => {
      if ( isSubCategory ) {
        return item.value.find(subItem => {
          return subItem.key === subCategoryKey
        })
      } else {
        return item.key === cateogryKey
      }
    })

    if ( isSubCategory ) {
      serviceObj = serviceObj.value.find(subItem => {
        return subItem.key === subCategoryKey
      })
    }
   console.log('serviceObj', serviceObj)
    const isVaildServiceObj = serviceObj !== undefined

    if (locale.toLowerCase() === 'en') {
      return isVaildServiceObj? serviceObj[`label`]:''
    } else {
      return isVaildServiceObj? serviceObj[`label_${locale}`]:''
    }
  }
