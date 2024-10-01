"use client";
import { Switch } from "@/components/ui/switch";
export default function PublishSwitch(partID:any) {
    return (
<div className="flex items-center">
<h1 className="p-1">Publish</h1>
<Switch checked={partID.partID.publish}/>
</div>
    )
}