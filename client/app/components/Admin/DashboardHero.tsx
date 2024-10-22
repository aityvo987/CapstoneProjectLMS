import React, { useState } from "react";
import DashboardWidgets from "./Widgets/DashboardWidgets";
import DashboardHeader from "./DashboardHeader";
type Props = {
    isDashboard?: boolean;
};
const DashboardHero = ({ isDashboard }: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            {
                isDashboard && (
                    <DashboardWidgets open={open} />
                )
            }
        </div>
    );
};
export default DashboardHero;