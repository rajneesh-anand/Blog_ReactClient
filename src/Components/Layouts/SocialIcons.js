import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";
import RedditIcon from "@material-ui/icons/Reddit";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

function SocialIcons(props) {
	const { url } = props;

	const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
	const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
	const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

	return (
		<div>
			<IconButton
				style={{ padding: "6px", color: "#3b5999" }}
				href={facebookUrl}
				target="_blank"
			>
				<FacebookIcon fontSize="small" />
			</IconButton>

			<IconButton
				style={{ padding: "6px", color: "#55acee" }}
				href={twitterUrl}
				target="_blank"
			>
				<TwitterIcon fontSize="small" />
			</IconButton>

			<IconButton
				style={{ padding: "6px", color: "#25D366" }}
				href={linkedinUrl}
				target="_blank"
			>
				<WhatsAppIcon fontSize="small" />
			</IconButton>
			<IconButton
				style={{ padding: "6px", color: "#ff5700" }}
				href={linkedinUrl}
				target="_blank"
			>
				<RedditIcon fontSize="small" />
			</IconButton>
			<IconButton
				style={{ padding: "6px", color: "#e4405f" }}
				href={linkedinUrl}
				target="_blank"
			>
				<InstagramIcon fontSize="small" />
			</IconButton>
		</div>
	);
}

export default SocialIcons;
