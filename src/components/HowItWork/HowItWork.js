import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './HowItWork.css';


const items = [
  {
    title: "Discover and choose a Coworkingspace",
    content: "Discover Workspaces nearby or in a few other places worldwide. From the Single Desk to a Meeting Room, book and choose the Office-Space you want. We have the right coworkingspace for every Budget and every requirement."
  },
  {
    title: "Request Coworkertime",
    content: "Have you questions about a Coworkingspace, the equipment or others? Use our Messaging Service to stay in touch with the service provider."
  },
  {
    title: "Book & Pay",
    content: "Schedule the time and the Date for your Workspace and book and pay with a few clicks."
  }
]
const ContentItem = props => {
  const { title, content, number } = props
  return (
    <div className={css.contentItem}>
     <div className={css.markContainer}>
        <div className={css.mark}>{number}</div>
      </div>
      <div className={css.textBoard}>
        <div className={css.subtitle}>
        	{title}
        </div>
        <div className={css.text}>{content}</div>
      </div>
    </div>
  )
}

class HowItWork extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return (
      <div className={css.mainWrapper}>
        <div className={css.title}>
          How it Works?
        </div>
        <div className={css.content}>
          <div className={css.mask}></div>
          <div className={css.contentBoard}>
            {
              items.map((item, index) => {
                return (
                  <ContentItem {...item} number={index+1} key={index}/>
                )
              })
            }
            {/* <button className={css.started}> GET STARTED </button> */}
          </div>
        </div>
      </div>
    );
  }
}



HowItWork.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

HowItWork.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowItWork;
