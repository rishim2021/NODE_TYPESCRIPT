import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";
import { User } from "../../common/userModel";

export const userRouter = express.Router();


userRouter.get("/", async (req: Request, res: Response) => {
    try {
      const users : any = await User.find();
  
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  userRouter.get("/:id" , async(req : Request , res : Response)=>{
    const id: any = req.params.id;
    try {
        const user : any  = await User.findById(id)
        res.status(200).send(user)
    } catch (e) {
    res.status(500).send(e.message);
  }
})

userRouter.post('/',async(req : Request, res: Response )=>{
  const bodyData = req.body;
  try{
    let userData = await User.find({ ph : bodyData.ph })
    console.log(userData);
    if(userData.length != 0) return res.status(400).send({ status:'400', msg:"Already Exists!!" })
    const user : any = await User({
      name:bodyData.name,
      dept : bodyData.dept,
      loc : bodyData.loc,
      ph : bodyData.ph 
    });
    user.save()
    return res.status(200).send({ status:'200', msg:"Sucessfully Submitted.." })
  }catch (e) {
    res.status(500).send(e.message);
  }
  
})
userRouter.put('/:id',async (req : Request, res: Response)=>{
    let id : any = req.params.id;
    let bodyData : any = req.body;
    try{
      const userData : any = await User.findByIdAndUpdate(id,{
        name:bodyData.name,
        dept : bodyData.dept,
        loc : bodyData.loc,
        ph : bodyData.ph 
      });
      userData.save()
      return res.status(200).send({ status:'200', msg:"Sucessfully Submitted.." })
    }catch (e) {
      res.status(500).send(e.message);
    }
});

userRouter.delete('/:id', async(req : Request , res : Response)=>{
  let id : any = req.params.id;
  console.log(id);
  try{
    const profileData : any = await User.findById(id);
    if(!profileData) return res.status(400).send({ status:'400' , msg:"Profile Not Found !!" })
    const userData : any = await User.findByIdAndDelete(id)
    return res.status(200).send({ status:'200', msg:"Sucessfully Deleted.." })
  }catch (e){
    res.status(500).send(e.message)
  }
});

