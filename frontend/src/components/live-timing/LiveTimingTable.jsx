import LoadingDots from "../common/LoadingDots";
import PirelliSoftIcon from "../../assets/icons/tyres/pirelli_soft.svg"
import PirelliMediumIcon from "../../assets/icons/tyres/pirelli_medium.svg"
import PirelliHardIcon from "../../assets/icons/tyres/pirelli_hard.svg"
import PirelliInterIcon from "../../assets/icons/tyres/pirelli_intermediate.svg"
import PirelliWetIcon from "../../assets/icons/tyres/pirelli_wet.svg"

import { getLaptimeFromMillisecond } from "../../utils/time_utils";
import { useState } from "react";

const LiveTimingTable = ({driverData}) => {
    const tableColumns = ["Position", "Name", "Lap time", "Gap", "Interval", "S1", "S2", "S3", "Tyre", "Pits"];

    const [lapInfo, setLapInfo] = useState(false);

    const handleSwitchLapInfo = () => {
        setLapInfo(info => !info);
    };

    const displayTyreData = (tyre) => {
        let tyreColor = "#fff", tyreIcon = PirelliHardIcon;
        switch (tyre) {
            case "SOFT":
                tyreColor = "#ff2d2c";
                tyreIcon = PirelliSoftIcon;
                break;
            case "MEDIUM":
                tyreColor = "#ffd318";
                tyreIcon = PirelliMediumIcon;
                break;
            case "HARD":
                tyreIcon = PirelliHardIcon;
                tyreColor = "#fff";
                break;
            case "INTERMEDIATE":
                tyreIcon = PirelliInterIcon;
                tyreColor = "#40cb32";
                break;
            case "WET":
                tyreIcon = PirelliWetIcon;
                tyreColor = "#078cd1";
                break;
            default:
                tyreColor = "#fff";
                break;
        }
        return (
            <div className="flex flex-row justify-start items-center h-8 my-auto text-ellipsis whitespace-nowrap overflow-hidden">
                <img
                    width={"20px"}
                    height={"20px"}
                    src={tyreIcon}
                />
                <span className={`ps-2 text-[${tyreColor}]`}>
                    {tyre}
                </span>
            </div>
        )

    };

    return (
        driverData ? (
            <table className="table-fixed m-auto w-[95%] min-w-[70rem] text-left text-sm max-md:text-xs">
                <thead
                    key="table_head"
                    className="font-f1-b"
                >
                    <tr key="table_col">
                        {tableColumns.map((columnText) => (
                            <th key={columnText} className="py-2">
                                {columnText}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody
                    key="table_body"
                    className=" [&>*:nth-child(even)]:bg-gray-900"
                >
                    {driverData.map((driver, index) => (
                        <tr
                            key={`driver_${index}`}
                            className="h-8"
                        >
                            <td key={`driver_${index}_pos`} className="ps-2">
                                {driver.position}
                            </td>
                            <td key={`driver_${index}_name`} className="pe-1 font-f1-b text-ellipsis whitespace-nowrap overflow-hidden">
                                {driver.name}
                            </td>
                            <td key={`driver_${index}_laptime`}>
                                {driver.laptime >= 0 ?
                                    getLaptimeFromMillisecond(driver.laptime)
                                    :
                                    (<span className="font-f1-b text-red-600">RETIRED</span>)
                                }
                            </td>
                            <td key={`driver_${index}_gap`}>
                                {driver.gap}
                            </td>
                            <td key={`driver_${index}_interval`}>
                                {driver.interval}
                            </td>
                            <td key={`driver_${index}_s1Time`}>
                                {driver.s1Time >= 0 ? driver.s1Time : "--"}
                            </td>
                            <td key={`driver_${index}_s2Time`}>
                                {driver.s2Time >= 0 ? driver.s2Time : "--"}
                            </td>
                            <td key={`driver_${index}_s3Time`}>
                                {driver.s3Time >= 0 ? driver.s3Time : "--"}
                            </td>
                            <td key={`driver_${index}_tyre`}>
                                {displayTyreData(driver.tyre)}
                            </td>
                            <td key={`driver_${index}_pits`} className="pe-2">
                                {Math.max(0, driver.stint - 1)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <div className="flex flex-row justify-center items-center w-full h-[400px] max-md:h-[300px]">
                <LoadingDots width={"100"} height={"100"} color={"#DC2626"} radius={"5"}/>
            </div>
        )
    )
};

export default LiveTimingTable;