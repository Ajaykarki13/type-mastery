


import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
  } from 'react-share';
  
  import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
  
  } from "react-share";
  
  import React from 'react'
  
  const Share = () => {
    const shareUrl = '';
    const title = ' ';
  
    return (
      <>
        < FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={36} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={36} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={36} round={true} />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={36} round={true} />
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} subject={title} body="Check out this link!">
          <EmailIcon size={36} round />
        </EmailShareButton>
      </>
    );
  }
  
  
  export default Share
  