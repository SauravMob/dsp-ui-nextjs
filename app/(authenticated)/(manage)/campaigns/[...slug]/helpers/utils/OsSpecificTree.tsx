import React, { useState } from 'react'
import { Tree, TreeProps } from "antd"
import osVersionList from '@/components/constants/json/os-version-list'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'

export default function OsSpecificTree({
    isEdit,
    form
}: {
    isEdit: boolean
    form: UseFormReturn<CampaignFormType, any, undefined>
}) {

    const { setValue, setError, clearErrors } = form

    const [state, setState] = useState<{
        expandedKeys: React.Key[],
        autoExpandParent: boolean,
        checkedKeys: React.Key[],
        selectedKeys: React.Key[]
    }>({
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: isEdit ? form.getValues("deviceOsVersion") : [],
        selectedKeys: []
    })

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        let os = ''
        if (info.node.title === 'ANDROID' || (info.node.key as string)?.includes('A.')) os = 'ANDROID'
        else if (info.node.title === 'IOS' || (info.node.key as string)?.includes('I.')) os = 'IOS'
        if (!form.watch("platforms")) setError('deviceOsVersion', { message: 'Please select OS platform to choose versions' })
        else if (!form.watch("platforms")?.includes(os) && (info.node.key === 'I.'.concat(info.node.title as string) || info.node.key === 'ALL.IOS')) setError('deviceOsVersion', { message: 'OS version not belongs to the chosen OS platform' })
        else if (!form.watch("platforms")?.includes(os) && (info.node.key === 'A.'.concat(info.node.title as string) || info.node.key === 'ALL.ANDROID')) setError('deviceOsVersion', { message: 'OS version not belongs to the chosen OS platform' })
        else {
            setState({ ...state, checkedKeys: checkedKeys as React.Key[] })
            if ((checkedKeys as string[])?.includes('ALL.IOS') && (checkedKeys as string[])?.includes('ALL.ANDROID')) setValue("deviceOsVersion", ['ALL.ALL'])
            else if ((checkedKeys as string[])?.includes('ALL.ANDROID')) setValue("deviceOsVersion", (checkedKeys as string[])?.filter(cr => !cr.includes('A.')))
            else if ((checkedKeys as string[])?.includes('ALL.IOS')) setValue("deviceOsVersion", (checkedKeys as string[])?.filter(cr => !cr.includes('I.')))
            else setValue("deviceOsVersion", (checkedKeys as string[]))
            clearErrors('deviceOsVersion')
        }
    }

    return (
        <FormField
            control={form.control}
            name="deviceOsVersion"
            render={({ field }) => (
                <FormItem className='grid grid-cols-3'>
                    <FormLabel className='col-span-1 flex items-center'>OS Range:</FormLabel>
                    <FormControl className='col-span-2'>
                        <Tree
                            checkable
                            treeData={osVersionList}
                            onExpand={(expandedKeys) => setState(prevState => ({ ...prevState, expandedKeys, autoExpandParent: false }))}
                            expandedKeys={state.expandedKeys}
                            autoExpandParent={state.autoExpandParent}
                            onCheck={onCheck}
                            checkedKeys={state.checkedKeys}
                            onSelect={(selectedKeys) => setState(prevState => ({ ...prevState, selectedKeys }))}
                            className='dark:bg-slate-950 dark:text-slate-50'
                            selectedKeys={state.selectedKeys}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
