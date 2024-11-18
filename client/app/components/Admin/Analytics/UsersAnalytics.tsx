
import { useGetCoursesAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { FC, useEffect, useState } from 'react'
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    LabelList,
    AreaChart,
    Tooltip,
    Area,
} from "recharts";
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/styles';
type Props = {
    isDashboard?: boolean;
}

const UsersAnalytics: FC<Props> = ({ isDashboard }: Props) => {
    const { data, isLoading, isError } = useGetUsersAnalyticsQuery({});


    const analyticsData: any = [];
    data &&
        data.users.last12Months.forEach((item: any) => {
            analyticsData.push({ name: item.month, count: item.count });
        });
    const minValue = 0;
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className={`${isDashboard ? "mt-[120px]" : "ml-6 mt-[120px] dark:bg-[#0f1623] shadow-sm pb-5 rounded-sm"}`}>
                        <div className={`${isDashboard? "!ml-8 mb-5": ''}`}>
                            <h1 className={`${styles.title} ${isDashboard && '!text-[20px] '} px-5 !text-start`}>
                                Users Analytics
                            </h1>
                            {
                                !isDashboard && (
                                    <p className={`${styles.label} px-5`}>
                                        Last 12 months analytics data{" "}
                                    </p>)
                            }
                        </div>
                        <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-fit'} flex items-center justify-center`}>
                            <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? "50%" : '100%'}>
                                <AreaChart
                                    data={analyticsData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#4d62d9"
                                        fill="#4d62d9"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div >

                )
            }
        </>
    )
}
export default UsersAnalytics