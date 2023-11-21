import { trpc } from "@/lib/trpc";
import { FC } from "react";

interface AppProps { }

const scrapedData = {
    activity: "volleyball",
    startTime: "10:00AM",
    endTime: "11:00AM",
    date: "Mon, Nov 20 ",
    location: "red-gym",
}


const Test: FC<AppProps> = ({ }) => {
    const response = trpc.createActivity.useMutation(scrapedData);
    console.log(response.data);

    // const password = response.data?.password;

    return <p className="text-white">{response.data}</p>;
};

export default Test;
