import { trpc } from "@/lib/trpc";
import { FC } from "react";

interface AppProps {}

const Array: FC<AppProps> = ({}) => {
	const response = trpc.getHello.useQuery();
	const createActivity = trpc.createActivity.useMutation();
	console.log(response.data);

	return (
		<>
			<p className="text-white">{response.data}</p>
			<button
				onClick={() => {
					const scrapedData = {
						activity: "volleyball",
						startTime: "10:00AM",
						endTime: "11:00AM",
						date: "Mon, Nov 20 ",
						location: "red-gym",
					}

					createActivity.mutate(scrapedData);
				}}
			>
				Press me
			</button>
		</>
	);
};

export default Array;
