const SessionSchedule = ({session, sessionName}) => {
    return (
        <li 
        key={`${sessionName}`}
        className="flex flex-row justify-start items-center rounded-md p-4 my-1 bg-gray-50"
        >
            <div className="w-52 max-md:w-36 border-e-2 border-red-600 pe-4 me-8">
                <h3 className=" font-f1-b text-2xl max-md:text-base">
                    {session.month} {session.day}
                </h3>
                <h3 className="text-base max-md:text-sm">{sessionName}</h3>
            </div>
            <div className="text-base max-md:text-sm">
                <h3>
                    {session.hour}:{session.minute === 0 ? "00" : session.minute} 
                    {sessionName !== "Race" && ` - ${session.hour + 1}:${session.minute === 0 ? "00" : session.minute}`}
                </h3>
            </div>
        </li>
    )
};

export default SessionSchedule;