import { toJSON } from "../utils";
import { get_history } from "../tables";
export interface History {
    address: string, timestamp: number
}

export const runtime = "edge";

export const revalidate = 0;

export async function GET(request: Request ) {
    const response = await get_history();
    const data = response.rows.map(row => {
        return {
            address: row.receiver,
            timestamp: new Date(row.timestamp + "Z").getTime()
        }
    })
    return toJSON(data);
}
