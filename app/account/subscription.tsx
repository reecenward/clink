"use client";
import { ArrowRightIcon, CheckCircledIcon, CrossCircledIcon, VideoIcon} from "@radix-ui/react-icons";
import {
    Card,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card";



  export default function Subscription() {

    return (
      
        <div className="w-full p-5 bg-slate-100 flex flex-col justify-center items-center">
           
        <h1 className="text-2xl font-bold p-10">Upgrade your account</h1>
        <div className="flex">
        <a href="https://buy.stripe.com/test_8wMcNNeCWdtO1iMaEF" className="group/item">
              <Card className="p-5 w-80 h-auto  mr-5 border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
              <div className=" flex justify-between items-center">
                <div className="">
                  <CardTitle className="mb-1">Free</CardTitle>
                  <CardDescription className="mb-2">Free for ever</CardDescription>
                </div>
                <div>
                <ArrowRightIcon className="h-8  w-8 stroke-blue-500 invisible group-hover/item:visible" />
                </div>
                </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>3 Widgets</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>5 Parts per widget</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>5 Stories</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p>Customization</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CrossCircledIcon className="h-5  w-5 slate-500 mr-2.5" />
                    <p>Remove Clink Logo</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CrossCircledIcon className="h-5  w-5 slate-500 mr-2.5" />
                    <p>Social Media Integrations</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CrossCircledIcon className="h-5  w-5 slate-500 mr-2.5" />
                    <p>Analytics</p>
                  </div>
                  <div className='flex w-full items-center bg-slate-200 p-1 rounded'>
                    <VideoIcon className="h-5  w-5 slate-500 mr-2.5" />
                    <p>Small library storage</p>
                  </div>
              </Card>
        
        </a>
        <a href="https://buy.stripe.com/test_8wMcNNeCWdtO1iMaEF" className="group/item">
              <Card className="p-5 w-80 h-auto  mr-5 border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
              <div className=" flex justify-between items-center">
                <div className="">
                  <CardTitle className="mb-1">Basic</CardTitle>
                  <CardDescription className="mb-2">Starting from $8.99 per month</CardDescription>
                </div>
                <div>
                <ArrowRightIcon className="h-8  w-8 stroke-blue-500 invisible group-hover/item:visible" />
                </div>
                </div>
              
                <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>15 Widgets</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>10 Parts per widget</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>25 Stories</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p>Customization</p>
                  </div>
                  <div className='flex w-full items-center'>
                  <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p>Remove Clink Logo</p>
                  </div>
                  <div className='flex w-full items-center'>
                  <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p>Social Media Integrations</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CrossCircledIcon className="h-5  w-5 slate-500 mr-2.5" />
                    <p>Analytics</p>
                  </div>
                  <div className='flex w-full items-center bg-slate-200 p-1 rounded'>
                    <VideoIcon className="h-5  w-5 slate-500 mr-2.5" />
                    <p>Medium library storage</p>
                  </div>
              </Card>
        
        </a>
        <a href="https://buy.stripe.com/test_8wMcNNeCWdtO1iMaEF" className="group/item">
              <Card className="p-5 w-80  h-auto   border-2 border-gray-600  hover:outline outline-4 outline-blue-500/[.33] cursor-pointer hover:border-blue-500">
              <div className=" flex justify-between items-center">
                <div className="">
                  <CardTitle className="mb-1">Pro</CardTitle>   
                  <CardDescription className="mb-2" >Starting from $14.99 per month</CardDescription>
                  </div>
                  <div>
                  <ArrowRightIcon className="h-8  w-8 stroke-blue-500 invisible group-hover/item:visible" />
               </div>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>50 Widgets</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>20 Parts per widget</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p className='font-bold'>100 Stories</p>
                  </div>
                  <div className='flex w-full items-center'>
                    <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p>Customization</p>
                  </div>
                  <div className='flex w-full items-center'>
                  <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p>Remove Clink Logo</p>
                  </div>
                  <div className='flex w-full items-center'>
                  <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p>Social Media Integrations</p>
                  </div>
                  <div className='flex w-full items-center'>
                  <CheckCircledIcon className="h-5  w-5 stroke-blue-500 mr-2.5" />
                    <p>Analytics</p>
                  </div>
                  <div className='flex w-full items-center bg-slate-200 p-1 rounded'>
                  <VideoIcon className="h-5  w-5 mr-2.5" />
                    <p>Big library storage</p>
                  </div>
              </Card>
              </a>
        
        </div>
        </div>
    );
  };
  
