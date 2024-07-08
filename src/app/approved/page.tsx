"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ApprovedComponent = dynamic(() => import("@/components/ApprovedComponent"), {
    suspense: true,
});

export default function ApprovedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApprovedComponent />
        </Suspense>
    );
}
