import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendNotification = (jobTitle, companynName, companyLogoUrl) => {
  const url = "https://api.onesignal.com/notifications?c=push";

  var notiTitle = `New Drive Arrived`;
  var notiContent = `${jobTitle} from ${companynName}`;

  const options = {
    method: "POST",
    url: url,
    headers: {
      accept: "application/json",
      Authorization: `Key ${process.env.ONESIGNAL_API_KEY}`,
      "content-type": "application/json",
    },
    data: {
      app_id: process.env.ONESIGNAL_APP_ID,
      included_segments: ["Total Subscriptions"],
      headings: { en: notiTitle },
      contents: { en: notiContent },
      big_picture: companyLogoUrl,
    },
  };

  axios(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
};

export default { sendNotification };
