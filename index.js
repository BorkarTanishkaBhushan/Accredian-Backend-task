const express = require('express');
const cors = require("cors")
const app = express();
const zod = require('zod');
const PrismaClient = require("@prisma/client");
// // const referralCodes = require('referral-codes')
// import referralCodes from 'referral-codes'

app.use(cors())
app.use(express.json());
console.log(referralCodes.generate({
    length: 8,
    count: 1,
  }))
const formSchema =  zod.object({
    referrerEmail: zod.string().email(),
	referrerName: zod.string(),
    refereeEmail: zod.string().email(),
	refereerName: zod.string(),
})

app.get('/api/refer', async (req, res) => {
    const { success } = formSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    try{
        const prisma = new PrismaClient();
        const res = await prisma.user.create({
            data: {
            referrerEmail: req.body.refererEmail,
            referrerName: req.body.refereerName,
            refereeEmail: req.body.refereeEmail,
            refereerName: req.body.refereeName,
            referal_code: referralCodes.generate()
            }
        })
        console.log(res);
        



    }catch(error){

    }
});

app.listen(3000, () => {
  console.log('BE app listening on port 3000!');
});