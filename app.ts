import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import cron from "node-cron";
import { EmailService } from "./helpers/mailer.service";
import { logger } from "./helpers/logger";
import { MongoClient } from "mongodb";
import moment from "moment";
const dbName = "demo";
const url = "http://localhost:3000"


const mongo_url = `mongodb+srv://som9819:Sg%409819504713@connect.zmh5d.mongodb.net/${dbName}?authSource=admin&replicaSet=Connect-shard-0&readPreference=primary&ssl=true`;
// Create a new MongoClient
const client = new MongoClient(mongo_url);
// Use connect method to connect to the Server  
client.connect(async function (err: any) {
  logger.info("Connected successfully to db");
  console.log("Connected successfully to db");
});

async function getEscalationMatrix(){
  const session = client.startSession();
  try {
    const db = client.db(dbName);
    const data = await db
      .collection("escalationmatrix")
      .find({},{session})
      .toArray();
    return data;
  } catch (error) {
    throw logger.error(error);
  }
  finally{
    session.endSession()
  }
};


cron.schedule("*/1 * * * *", async () => {
  console.log("==========Starting cron scheduler==========")
  await setEscalation()
  console.log("==========Ending cron scheduler==========")
},
  { timezone: "Asia/Kolkata" }
)




async function setEscalation(){
  const results = await getEscalationMatrix();
  for(let result of results){
    const {pendingAt, escalateTo, escalationTimeInHours} = result;
      const res = await axios.put(
      `${url}/api/escalate-tickets`,
      {pendingAt, escalateTo, escalationTimeInHours}
    );
  }
}
