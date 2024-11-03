import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButtons = ({ url, title }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Facebook Share Button */}
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      {/* Twitter Share Button */}
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      {/* LinkedIn Share Button */}
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      {/* WhatsApp Share Button */}
      <WhatsappShareButton url={url} title={title} separator=" - ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
