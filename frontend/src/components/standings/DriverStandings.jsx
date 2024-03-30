import LoadingSpinner from "../common/LoadingSpinner";

const DriverStandings = ({driverStandings}) => {
    const standingsColumns = ["Position", "Driver", "No.", "Nationality", "Team", "Points"];

    return (
        driverStandings ? (
            <table className="table-fixed m-auto w-[95%] min-w-[60rem] text-left">
                <thead className="font-f1-b">
                    <tr>
                        {standingsColumns.map((columnText) => (
                            <th className="py-2">{columnText}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className=" [&>*:nth-child(even)]:bg-white text-sm">
                    {driverStandings.map((driver) => (
                        <tr 
                            key={driver.Driver.permanentNumber} 
                            className="h-10 text-gray-800"
                        >
                            <td className="ps-2">{driver.position}</td>
                            <td>{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</td>
                            <td>{driver.Driver.permanentNumber === "33" ? "1" : driver.Driver.permanentNumber}</td>
                            <td>{driver.Driver.nationality}</td>
                            <td>{driver.Constructors[0]?.name}</td>
                            <td className="pe-2">{driver.points}</td>
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

export default DriverStandings;