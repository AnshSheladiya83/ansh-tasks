"use strict";(()=>{var e={};e.id=478,e.ids=[478],e.modules={7138:e=>{e.exports=require("micro-cors")},6037:e=>{e.exports=require("mongoose")},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,s){return s in t?t[s]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,s)):"function"==typeof t&&"default"===s?t:void 0}}})},5067:(e,t,s)=>{s.r(t),s.d(t,{config:()=>f,default:()=>m,routeModule:()=>p});var a={};s.r(a),s.d(a,{default:()=>c});var n=s(9947),r=s(2706),o=s(6762),i=s(7862),u=s(194),d=s(7138);let l=s.n(d)()();async function c(e,t){await l(e,t),await (0,i.A)();let{method:s,query:{id:a}}=e;switch(s){case"GET":try{let e=await u.A.findById(a);if(!e)return t.status(404).json({message:"Task not found"});t.status(200).json(e)}catch(e){t.status(500).json({message:e.message||"Failed to fetch task"})}break;case"PUT":try{let s=await u.A.findByIdAndUpdate(a,e.body,{new:!0,runValidators:!0});if(!s)return t.status(404).json({message:"Task not found"});t.status(200).json(s)}catch(e){t.status(400).json({message:e.message||"Failed to update task"})}break;case"DELETE":try{if(!await u.A.findByIdAndDelete(a))return t.status(404).json({message:"Task not found"});t.status(200).json({message:"Task deleted successfully"})}catch(e){t.status(500).json({message:"Failed to delete task"})}break;default:t.setHeader("Allow",["GET","PUT","DELETE"]),t.status(405).end(`Method ${s} Not Allowed`)}}let m=(0,o.M)(a,"default"),f=(0,o.M)(a,"config"),p=new n.PagesAPIRouteModule({definition:{kind:r.A.PAGES_API,page:"/api/task/[id]",pathname:"/api/task/[id]",bundlePath:"",filename:""},userland:a})},7862:(e,t,s)=>{s.d(t,{A:()=>i});var a=s(6037),n=s.n(a);let r=process.env.MONGODB_URI;if(!r)throw Error("Please define the MONGODB_URI environment variable");let o=global.mongoose;o||(o=global.mongoose={conn:null,promise:null});let i=async function(){return o.conn||(o.promise||(o.promise=n().connect(r,{useNewUrlParser:!0,useUnifiedTopology:!0}).then(e=>e)),o.conn=await o.promise),o.conn}},194:(e,t,s)=>{s.d(t,{A:()=>o});var a=s(6037),n=s.n(a);let r=new(n()).Schema({name:{type:String,required:!0},completed:{type:Boolean,default:!1},taskNumber:{type:Number,required:!0,unique:!0}},{timestamps:!0});r.pre("save",async function(e){if(this.isNew){let e=await n().models.Task.findOne().sort({taskNumber:-1});this.taskNumber=e?e.taskNumber+1:1}e()});let o=n().models.Task||n().model("Task",r)},2706:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return s}});var s=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,t,s)=>{e.exports=s(5600)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var s=t(t.s=5067);module.exports=s})();