import LoadingSpinner from "../common/LoadingSpinner";

import { millisecondToTimeString } from "../../utils/time_utils";

const QualifyingResult = ({qualifyingResult}) => {
    const resultColumns = ["Position", "Driver", "No.", "Team", "Q1", "Q2", "Q3"];

    return (
        qualifyingResult ? (
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
                    {qualifyingResult.map((driver) => (
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
                            <td key={`${driver.driverNum}_q1Time`}>
                                {driver.q1 >= 0 ? 
                                    millisecondToTimeString(driver.q1, false)
                                    :
                                    "--"
                                }
                            </td>
                            <td key={`${driver.driverNum}_q2Time`}>
                                {driver.q2 >= 0 ? 
                                    millisecondToTimeString(driver.q2, false)
                                    :
                                    "--"
                                }
                            </td>
                            <td key={`${driver.driverNum}_q3Time`} className="pe-2">
                                {driver.q3 >= 0 ? 
                                    millisecondToTimeString(driver.q3, false)
                                    :
                                    "--"
                                }
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

export default QualifyingResult;