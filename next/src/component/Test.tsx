import { trpc } from "@/lib/trpc";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { FC, useEffect, useState } from "react";
import { AppRouter } from "../../../packages/api/routers/index";

import React from 'react'

// create TRPC client 
const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: "http://localhost:5000/trpc",
    })]
})

const scrapedData = {
    activity: "volleyball",
    startTime: "10:00AM",
    endTime: "11:00AM",
    date: "Mon, Nov 20 ",
    location: "red-gym",
}

function Test() {

    useEffect(() => {
        main();
    }, [])

    async function main() {
        const result = await client.createActivity.mutate(scrapedData)
        console.log("RESULTTTTT", result);
    }

    return (
        <h1 className="text-6xl bg-red-600"></h1>
    )
}

export default Test;
