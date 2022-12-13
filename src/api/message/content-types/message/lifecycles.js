module.exports = {
  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event;

    // Get email recipients
    const { CONTACT_EMAILS } = process.env;
    var emailRecipients = ["jlivornese@gmail.com"];
    if (CONTACT_EMAILS) {
      emailRecipients = CONTACT_EMAILS.split("|");
    }

    // Build the email template and populate with form data
    let emailHtml = `
    <p>You received a message through the contact form</p>
    <p><b>Name: </b>${result.name}</p>
    <p><b>Email Address: </b>${result.emailAddress}</p>
    <p><b>Phone Number: </b>${result.phoneNumber}</p>
    <p><b>Topic: </b>${result.topic}</p>
    <p><b>Other Topic: </b>${result.topicOther}</p>
    <p><b>Message: </b>${result.messageText}</p>
    `;

    try {
      await strapi.plugins["email"].services.email.send({
        // to: "jlivornese@gmail.com",
        to: emailRecipients,
        from: "info@yankeedahliasociety.com", // e.g. single sender verification in SendGrid
        // cc: "valid email address",
        // bcc: "valid email address",
        // replyTo: "valid email address",
        subject: "Contact Form Submission",
        // text: "${result.messageText}", // Replace with a valid field ID
        html: emailHtml,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
