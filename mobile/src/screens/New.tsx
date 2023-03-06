import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import {useState} from "react"
const avaiableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]
export function New() {
    const [weekDays,setWeekDays] = useState<number[]>([]);
    function handleToggleWeekDays(weekDayIndex:number){
        if(weekDays?.includes(weekDayIndex)){
            setWeekDays(prevState => prevState?.filter(weekDay => weekDay !== weekDayIndex));

        }else{
           
            setWeekDays(prevState => [...prevState,weekDayIndex]);
        }
    }
    return (
        <View className='flex-1 bg-background px-8 pt-16'>
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:100}}>
                <BackButton />
                <Text className='mt-6 text-white font-extrabold text-3xl'>
                    Criar hábito
                </Text>
                <Text className='mt-6 text-white font-semibold text-base'>
                    Qual o seu comprometimento?
                </Text>
                <TextInput 
                className='h-12 pl-4 rounded-lg mt-3  bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600'
                placeholder='Exercícios, dormir bem, etc...'
                placeholderTextColor={colors.zinc[400]}
                ></TextInput>
                <Text className='mt-4 mb-3 text-white font-semibold text-base'>
                    Qual a recorrência?
                </Text>
                {
                    avaiableWeekDays.map((day, index) => {
                        return (
                            <Checkbox  
                            key={`${day}-${index}`} 
                            title={day}
                            checked={weekDays?.includes(index)}
                            onPress={() => handleToggleWeekDays(index)}
                            ></Checkbox>
                        )
                    })
                }
                <TouchableOpacity 
                className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
                activeOpacity={0.7}>
                    <Feather name='check' size={20}
                    color={colors.white}
                    >

                    </Feather>
                    <Text className='font-semibold text-white ml-2'>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}