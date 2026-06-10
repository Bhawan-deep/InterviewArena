const transporter =
require("../config/mail");

const sendInvite = async (req,res) => {
   try {
     await transporter.sendMail({

   from: `"Interview Arena" <${process.env.EMAIL_USER}>`,

   to: req.body.email,

   subject: "Interview Invitation",

   text: `
You have been invited to an interview.

Room Code: FD-DOG

Join the interview platform and enter the room code.

Best of luck!
`

});

res.status(200).json({
   message:"Mail sent successfully"
});
   }
   catch(error){
      res.status(500).json({
         message:error.message
      });
   }
};
module.exports = {
   sendInvite
};