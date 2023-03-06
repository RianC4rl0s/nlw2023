import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]

export function NewHabitForm() {
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([])
    async function createNewHabit(event: FormEvent) {
        event.preventDefault()
        //console.log(weekDays)
        if (!title || weekDays.length == 0) {
            return
        }

        await api.post('habits', {
            title: title,
            weekDays: weekDays
        })

        setTitle('')
        setWeekDays([])
        alert("Hábito Criado com sucesso!!!")
    }
    function handleToggleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day != weekDay)
            setWeekDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]
            setWeekDays(weekDaysWithAddedOne)
        }

    }
    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual o seu comprometimento?
            </label>
            <input
                type="text"
                id="title"
                placeholder="ex.: Exercicios, dormir bem, etc..."
                autoFocus
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                onChange={event => {
                    setTitle(event.target.value)
                }}
                value={title}
            />
            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>
            <div className="flex flex-col gap-2 mt-3">
                {
                    availableWeekDays.map((day, index) => {
                        return (
                            <Checkbox.Root
                                key={day}
                                className="flex items-center gap-3 group"
                                onCheckedChange={() => handleToggleWeekDay(index)}
                                checked={weekDays.includes(index)}
                            >
                                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800
                            group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                                    <Checkbox.Indicator >
                                        <Check size={20} className="text-white"></Check>
                                    </Checkbox.Indicator>
                                </div>
                                <span
                                    className=" text-white leading-tight"
                                >{day}</span>
                            </Checkbox.Root>
                        )
                    })
                }

            </div>
            <button type="submit"
                className="mt-6  rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-600 justify-center hover:bg-green-500">
                <Check size={20} weight='bold'></Check>
                Confirmar
            </button>
        </form>
    )
}