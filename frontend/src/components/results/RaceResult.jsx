import LoadingSpinner from "../common/LoadingSpinner";

import { millisecondToTimeString } from "../../utils/time_utils";

const RaceResult = ({raceResult}) => {
    const resultColumns = ["Position", "Driver", "No.", "Team", "Time", "Points"];

    return (
        raceResult ? (
            <table className="table-fixed m-auto w-[95%] min-w-[65rem] text-left">
                <thead
                    key="table_head"
                    className="font-f1-b"
                >
                    <tr key="table_col">
                        {resultColumns.map((columnText) => (
                            <th key={columnText} className="py-2">
                                {columnText}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody
                    key="table_body"
                    className=" [&>*:nth-child(even)]:bg-white text-sm max-md:text-xs"
                >
                    {raceResult.map((driver) => (
                        <tr
                            key={driver.driverNum}
                            className="h-10 text-gray-800"
                        >
                            <td key={`${driver.driverNum}_pos`} className="ps-2">
                                {driver.position}
                            </td>
                            <td key={`${driver.driverNum}_name`} className="text-ellipsis overflow-hidden">
                                {driver.driverName}
                            </td>
                            <td key={`${driver.driverNum}_num`}>
                                {driver.driverNum}
                            </td>
                            <td key={`${driver.driverNum}_team`} className="text-ellipsis overflow-hidden">
                                {driver.teamName}
                            </td>
                            <td key={`${driver.driverNum}_time`}>
                                {driver.status === "Finished" ?
                                    driver.position !== 1 ? `+ ${millisecondToTimeString(driver.time, false)}` : millisecondToTimeString(driver.time)
                                    :
                                    driver.status === "+1 Lap" ?
                                    "+ 1 Lap"
                                    :
                                    "DNF"
                                }
                            </td>
                            <td key={`${driver.driverNum}_pts`} className="pe-2">
                                {driver.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <div className="flex flex-row justify-center items-center w-auto h-60 max-md:h-40">
                <LoadingSpinner width={"100"} height={"100"} color={"#DC2626"}/>
            </div>
        )
    )
};

export default RaceResult;