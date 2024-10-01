"use client";
import { Switch } from "@/components/ui/switch";
export default function FirstSwitch(partID:any) {
    console.log(partID.partID)
    return (
<div className="flex items-center">
<h1 className="p-1">Is First</h1>
<Switch checked={partID.partID.first}/>
</div>
    )
}