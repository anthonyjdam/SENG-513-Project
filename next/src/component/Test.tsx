import { trpc } from "@/lib/trpc";
import { FC } from "react";

interface AppProps { }

const Test: FC<AppProps> = ({ }) => {
    const response = trpc.users.getPassword.useQuery();
    console.log(response.data);

    // const password = response.data?.password;

    return <p className="text-white">{response.data}</p>;
};

export default Test;
