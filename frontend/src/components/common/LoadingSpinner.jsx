import { ColorRing } from "react-loader-spinner";

const LoadingSpinner = ({width, height, color}) => {
    return (
        <ColorRing
            visible={true}
            height={height ? height : "100"}
            width={width ? width : "100"}
            ariaLabel="loading"
            colors={
                color
                ? [color, color, color, color, color]
                : ["#6B7280", "#6B7280", "#6B7280", "#6B7280", "#6B7280"]
                }
        />
    )
};

export default LoadingSpinner;