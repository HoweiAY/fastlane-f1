import { ThreeDots } from "react-loader-spinner";

const LoadingDots = ({width, height, color, radius}) => {
    return (
        <ThreeDots
            visible={true}
            height={height ? height : "80"}
            width={width ? width : "80"}
            ariaLabel="loading-live-data"
            color={color ? color : "#6B7280"}
            radius={radius ? radius : "9"}
        />
    )
};

export default LoadingDots;