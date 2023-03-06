import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, ScrollView,Alert } from "react-native";

import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart } from '../../src/utils/generate-range-between-dates'

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";


const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSumaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSumaryDatesSizes - datesFromYearStart.length;
export function Home() {
    const [loading,setLoading] = useState(true)
    const [summary,setSummary] = useState(null)
    const { navigate } = useNavigation();
    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('/summary')
            setSummary(response.data)
        } catch (error) {
            Alert.alert("Ops..."," Não foi possivel carregar o súmario")
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }
    useEffect(()=>{fetchData()},[])
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header></Header>
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => {
                        return (
                            <Text key={`${weekDay}-${i}`}
                                className="text-zinc-400 text-xl font-bold text-center mx-1"
                                style={{ width: DAY_SIZE, height: DAY_SIZE }}>
                                {weekDay}

                            </Text>
                        )
                    })
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                <View className="flex-row flex-wrap">
                    {/* <HabitDay /> */
                        datesFromYearStart.map(date => {
                            return (
                                <HabitDay
                                    key={date.toISOString()} 
                                    onPress={()=>navigate('habit',{date:date.toISOString()})}
                                    />
                            )
                        })
                    }
                    {
                        amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill })
                            .map((_, i) => {
                                return (
                                    <View key={i}
                                        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                        style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                    >

                                    </View>
                                )
                            })
                    }
                </View>
            </ScrollView>

        </View>
    )
}