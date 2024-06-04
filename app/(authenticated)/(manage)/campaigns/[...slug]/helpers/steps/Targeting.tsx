import { Card, CardFooter } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CampaignFormType } from '../CampaignForm'
import { MultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { countryOption, getCarrierOptions, getCitiesOptions, getDeviceModelOptions, getRegionOptions, includeExcludeOptions } from '@/components/utility/utils/GeoUtils'
import { useDropzone } from 'react-dropzone'
import { Airplay, ArrowLeft, ArrowRight, Download, Smartphone, Tablet, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { uploadFiles } from '../../../actions'
import { connectionTypeOptions, genderOptions } from '@/components/utility/utils/Utils'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Nouislider from 'nouislider-react'
import "nouislider/distribute/nouislider.css"
import wNumb from 'wnumb'
import OsSpecificTree from '../utils/OsSpecificTree'
import manufacturerOptions from '@/components/constants/json/device-manufacturer.json'
import AudienceTargeting from '../utils/AudienceTargeting'

export default function Targeting({
  form,
  isAdmin,
  isEdit,
  next,
  prev
}: {
  form: UseFormReturn<CampaignFormType, any, undefined>
  isAdmin: boolean
  isEdit: boolean
  next: () => Promise<void>
  prev: () => void
}) {

  const router = useRouter()
  const { setValue, clearErrors } = form

  const latlonDrop = useCallback(async (files: File[], rejected: { file: File, errors: { message: string }[] }[]) => {
    if (rejected.length > 0) {
      form.setError("geoLatlonFilename", { message: rejected[0].errors[0].message })
    } else {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('name', files[0].name)
      formData.append('type', files[0].type)
      formData.append('fileName', 'latlon')
      const result = await uploadFiles(formData)
      if (result.hasOwnProperty("url")) {
        setValue('geoLatlonFilename', files[0].name)
        clearErrors("geoLatlonFilename")
      }
    }
  }, [])

  const iplistDrop = useCallback(async (files: File[], rejected: { file: File, errors: { message: string }[] }[]) => {
    if (rejected.length > 0) {
      form.setError("iptargetFilepath", { message: rejected[0].errors[0].message })
    } else {
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('name', files[0].name)
      formData.append('type', files[0].type)
      formData.append('fileName', 'iplist')
      const result = await uploadFiles(formData)
      if (result.hasOwnProperty("url")) {
        setValue('iptargetFilepath', files[0].name)
        clearErrors("iptargetFilepath")
      }
    }
  }, [])

  const latlonDropZone = useDropzone({
    onDrop: latlonDrop,
    accept: { 'text/csv': ['.csv'] },
    maxSize: 10485760,
    maxFiles: 1
  })

  const iplistDropZone = useDropzone({
    onDrop: iplistDrop,
    accept: { 'text/csv': ['.csv'] },
    maxSize: 10485760,
    maxFiles: 1
  })

  return (
    <Card className='p-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='border-r pr-4'>
          <FormField
            control={form.control}
            name="countries"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Location<span className='text-red-900'>*</span></FormLabel>
                <FormControl>
                  <SelectInput
                    placeholder="Country..."
                    isClearable={true}
                    isSearchable={true}
                    name="countries"
                    value={countryOption.filter(v => v.value === field.value)[0]}
                    options={countryOption}
                    onChange={(e) => {
                      setValue("countries", e ? e.value : "")
                      setValue("regions", [])
                      setValue("cities", [])
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 mt-2 gap-4'>
            <FormField
              control={form.control}
              name="regions"
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormControl>
                    <MultiSelectInput
                      placeholder="Region..."
                      isClearable={true}
                      isSearchable={true}
                      name="regions"
                      value={getRegionOptions(form.getValues("countries")).filter(v => field.value.includes(v.value))}
                      options={getRegionOptions(form.getValues("countries"))}
                      onChange={(e) => setValue("regions", e ? e.map(v => v.value) : [])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regionsExclude"
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormControl>
                    <SelectInput
                      placeholder="Include/Exclude"
                      isClearable={true}
                      isSearchable={true}
                      name="regionsExclude"
                      value={includeExcludeOptions.filter(v => v.value === field.value)[0]}
                      options={includeExcludeOptions}
                      onChange={(e) => {
                        setValue("regionsExclude", e ? e.value : "")
                        setValue("cities", [])
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-3 mt-2 gap-4'>
            <FormField
              control={form.control}
              name="cities"
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormControl>
                    <MultiSelectInput
                      placeholder="City..."
                      isClearable={true}
                      isSearchable={true}
                      name="cities"
                      value={getCitiesOptions(form.getValues("countries"), form.watch("regions"), form.watch("regionsExclude")).filter(v => field.value.includes(v.value))}
                      options={getCitiesOptions(form.getValues("countries"), form.watch("regions"), form.watch("regionsExclude"))}
                      onChange={(e) => setValue("cities", e ? e.map(v => v.value) : [])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="citiesExclude"
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormControl>
                    <SelectInput
                      placeholder="Include/Exclude"
                      isClearable={true}
                      isSearchable={true}
                      name="citiesExclude"
                      value={includeExcludeOptions.filter(v => v.value === field.value)[0]}
                      options={includeExcludeOptions}
                      onChange={(e) => setValue("citiesExclude", e ? e.value : "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="geoLatlonFilename"
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel className='flex justify-between'>
                  <div className='font-bold'>Lat / Lon</div>
                  <div>
                    <a href='/gps_latlon_list_sample.csv' download className='text-[14px] flex justify-end'><Download className='opacity-70 mr-2' size={18} />Download Sample File</a>
                  </div>
                </FormLabel>
                <FormControl>
                  <>
                    <Card {...latlonDropZone.getRootProps()} className='p-4'>
                      <input {...latlonDropZone.getInputProps()} />
                      {<div className='opacity-80 text-sm cursor-pointer'>{form.getValues("geoLatlonFilename") ? form.getValues("geoLatlonFilename") : <>
                        <p>Default radius distance covered for these coordinates is 2 km.</p>
                        <div className='border p-5 mt-3 rounded-lg min-h-10 flex flex-col justify-center items-center'>
                          <div>
                            Drop .CSV file or <Button type="button">Browse</Button>
                          </div>
                          <div className='mt-1'>
                            Max file size 10 MB
                          </div>
                        </div>
                      </>}
                      </div>}
                    </Card>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="connectionType"
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormLabel className='font-bold'>Network Type<span className='text-red-900'>*</span></FormLabel>
                <FormControl>
                  <MultiSelectInput
                    placeholder="Network Type..."
                    isClearable={true}
                    isSearchable={true}
                    name="connectionType"
                    value={connectionTypeOptions.filter(v => field.value.includes(v.value))}
                    options={connectionTypeOptions}
                    onChange={(e) => {
                      setValue("connectionType", e ? e.map(v => v.value) : [])
                      clearErrors("connectionType")
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-4 mt-3'>
            <FormField
              control={form.control}
              name="carriers"
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel className='font-bold'>Carriers / Operators</FormLabel>
                  <FormControl>
                    <MultiSelectInput
                      placeholder="Carriers..."
                      isClearable={true}
                      isSearchable={true}
                      name="carriers"
                      value={getCarrierOptions(form.watch("countries")).filter(v => field.value.includes(v.value))}
                      options={getCarrierOptions(form.getValues("countries"))}
                      onChange={(e) => {
                        setValue("carriers", e ? e.map(v => v.value) : [])
                        clearErrors("carriers")
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carriersExclude"
              render={({ field }) => (
                <FormItem className='col-span-1 mt-8'>
                  <FormControl>
                    <SelectInput
                      placeholder="Include/Exclude"
                      isClearable={true}
                      isSearchable={true}
                      name="carriersExclude"
                      value={includeExcludeOptions.filter(v => v.value === field.value)[0]}
                      options={includeExcludeOptions}
                      onChange={(e) => setValue("carriersExclude", e ? e.value : "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="iptargetFilepath"
            render={({ field }) => (
              <FormItem className='mt-6'>
                <FormLabel className='flex justify-between'>
                  <div className='font-bold'>IP Targeting</div>
                  <div>
                    <a href='/ip_targeting_sample.csv' download className='text-[14px] flex justify-end'><Download className='opacity-70 mr-2' size={18} />Download Sample File</a>
                  </div>
                </FormLabel>
                <FormControl>
                  <>
                    <Card {...iplistDropZone.getRootProps()} className='p-4'>
                      <input {...iplistDropZone.getInputProps()} />
                      {<div className='opacity-80 text-sm cursor-pointer'>{form.getValues("iptargetFilepath") ? form.getValues("iptargetFilepath") : <>
                        <div className='border p-5 mt-3 rounded-lg min-h-10 flex flex-col justify-center items-center'>
                          <div>
                            Drop .CSV file or <Button type="button">Browse</Button>
                          </div>
                          <div className='mt-1'>
                            Max file size 10 MB
                          </div>
                        </div>
                      </>}
                      </div>}
                    </Card>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="adMedium"
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormLabel className='font-bold'>Device Type<span className='text-red-900'>*</span></FormLabel>
                <FormControl>
                  <div className='flex items-center justify-around'>
                    <div className='bg-slate-200 p-3 border shadow-md rounded-lg dark:bg-slate-800 flex items-center'>
                      <Checkbox
                        id="desktop"
                        className='mr-2'
                        checked={form.watch("adMedium").includes('DESKTOP')}
                        disabled={form.getValues("sourceType") === "APP" || form.watch("adMedium").includes("MOBILE") || form.watch("adMedium").includes("TABLET")}
                        onCheckedChange={() => {
                          setValue("adMedium", form.watch("adMedium").includes("DESKTOP") ? [] : ['DESKTOP'])
                          setValue("platforms", [])
                          setValue("deviceManufacturer", [])
                          setValue("deviceManufacturerModel", [])
                          setValue("deviceOsVersion", [])
                        }}
                      />
                      <FormLabel className='flex text-md items-center'>
                        <Airplay size={14} className='mr-1' />
                        Desktop
                      </FormLabel>
                    </div>
                    <div className='bg-slate-200 p-3 border shadow-md rounded-lg dark:bg-slate-800 flex items-center'>
                      <Checkbox
                        id="desktop"
                        className='mr-2'
                        checked={form.watch("adMedium").includes('MOBILE')}
                        disabled={form.watch("adMedium").includes("DESKTOP")}
                        onCheckedChange={() => {
                          setValue("adMedium", form.watch("adMedium").includes("MOBILE") ? form.watch("adMedium").filter(v => v !== "MOBILE") : [...form.watch("adMedium"), 'MOBILE'])
                        }}
                      />
                      <FormLabel className='flex text-md items-center'>
                        <Smartphone size={14} className='mr-1' />
                        Phone
                      </FormLabel>
                    </div>
                    <div className='bg-slate-200 p-3 border shadow-md rounded-lg dark:bg-slate-800 flex items-center'>
                      <Checkbox
                        id="desktop"
                        className='mr-2'
                        checked={form.watch("adMedium").includes('TABLET')}
                        disabled={form.watch("adMedium").includes("DESKTOP")}
                        onCheckedChange={() => {
                          setValue("adMedium", form.watch("adMedium").includes("TABLET") ? form.watch("adMedium").filter(v => v !== "TABLET") : [...form.watch("adMedium"), 'TABLET'])
                        }}
                      />
                      <FormLabel className='flex text-md items-center'>
                        <Tablet size={14} className='mr-1' />
                        Tablet
                      </FormLabel>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="platforms"
            render={({ field }) => (
              <FormItem className='space-x-7 flex items-center my-6 space-y-0'>
                <FormLabel className='font-bold'>OS</FormLabel>
                <FormControl>
                  <div className='grid grid-cols-2 gap-4 w-full mt-0'>
                    <div className='flex items-center justify-center'>
                      <Checkbox
                        id="androidOs"
                        className='mr-2'
                        disabled={form.getValues("adMedium").includes("DESKTOP")}
                        checked={form.watch("platforms").includes('ANDROID')}
                        onCheckedChange={() => {
                          setValue("platforms", form.watch("platforms").includes("ANDROID") ? form.watch("platforms").filter(v => v !== "ANDROID") : [...form.watch("platforms"), 'ANDROID'])
                          setValue("deviceOsVersionType", "ALL")
                          setValue("deviceOsVersion", [])
                        }}
                      />
                      <FormLabel>Android</FormLabel>
                    </div>
                    <div className='flex items-center justify-center'>
                      <Checkbox
                        id="iOs"
                        className='mr-2'
                        disabled={form.getValues("adMedium").includes("DESKTOP")}
                        checked={form.watch("platforms").includes('IOS')}
                        onCheckedChange={() => {
                          setValue("platforms", form.watch("platforms").includes("IOS") ? form.watch("platforms").filter(v => v !== "IOS") : [...form.watch("platforms"), 'IOS'])
                          setValue("deviceOsVersionType", "ALL")
                          setValue("deviceOsVersion", [])
                        }}
                      />
                      <FormLabel>iOS</FormLabel>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deviceOsVersionType"
            render={({ field }) => (
              <FormItem className='space-x-7 flex items-center my-6 space-y-0'>
                <FormLabel className='font-bold text-nowrap'>OS Versions</FormLabel>
                <FormControl>
                  <RadioGroup
                    disabled={form.watch("adMedium").includes("DESKTOP")}
                    onValueChange={(value) => {
                      setValue("deviceOsVersionType", value)
                      if (value === "RANGE") setValue("deviceOsVersion", ['7.00', '20.00'])
                      else setValue("deviceOsVersion", [])
                    }}
                    value={field.value}
                    className='grid grid-cols-3 gap-4 w-full'
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0 justify-center">
                      <FormControl>
                        <RadioGroupItem value="ALL" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        All
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0 justify-center">
                      <FormControl>
                        <RadioGroupItem value="RANGE" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Range
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0 justify-center">
                      <FormControl>
                        <RadioGroupItem value="SPECIFIC" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Specific
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {(!form.watch("adMedium").includes("DESKTOP") && form.watch("deviceOsVersionType") === "RANGE") && <>
            <FormField
              control={form.control}
              name="deviceOsVersion"
              render={({ field }) => (
                <FormItem className='grid grid-cols-3'>
                  <FormLabel className='col-span-1 flex items-center'>OS Range:</FormLabel>
                  <FormControl className='col-span-2'>
                    <Nouislider
                      start={field.value}
                      direction={'ltr'}
                      orientation='horizontal'
                      tooltips={[
                        wNumb({ decimals: 2 }),
                        wNumb({ decimals: 2 })
                      ]}
                      range={{ min: 1.00, max: 20.00 }}
                      style={{
                        marginTop: '1rem',
                        height: '1rem',
                        backgroundColor: "darkgray"
                      }}
                      className='w-full'
                      onSlide={field.onChange}
                      connect
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>}
          {(!form.watch("adMedium").includes("DESKTOP") && form.watch("deviceOsVersionType") === "SPECIFIC") && <><OsSpecificTree isEdit={isEdit} form={form} /></>}
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <FormField
              control={form.control}
              name="deviceManufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelectInput
                      placeholder="Device Manufacturers..."
                      isClearable={true}
                      isSearchable={true}
                      name="deviceManufacturer"
                      isDisabled={form.watch("adMedium").includes("DESKTOP")}
                      value={manufacturerOptions.filter(v => field.value.includes(v.value))}
                      options={manufacturerOptions}
                      onChange={(e) => setValue("deviceManufacturer", e ? e.map(v => v.value) : [])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceManufacturerModel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelectInput
                      placeholder="Device Models..."
                      isClearable={true}
                      isSearchable={true}
                      isDisabled={form.watch("adMedium").includes("DESKTOP")}
                      name="deviceManufacturerModel"
                      value={getDeviceModelOptions(form.watch("deviceManufacturer")).filter(v => field.value.includes(v.value))}
                      options={getDeviceModelOptions(form.watch("deviceManufacturer"))}
                      onChange={(e) => setValue("deviceManufacturerModel", e ? e.map(v => v.value) : [])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="strictIfaTargeting"
            render={({ field }) => (
              <FormItem className='space-x-7 flex items-center mt-6 mb-3 space-y-0'>
                <FormLabel className='font-bold text-nowrap'>Device Identifier</FormLabel>
                <FormControl>
                  <RadioGroup
                    disabled={form.watch("adMedium").includes("DESKTOP")}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value.toString()}
                    className='grid grid-cols-3 gap-4 w-full'
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0 justify-center">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Present
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0 justify-center">
                      <FormControl>
                        <RadioGroupItem value="0" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Missing
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0 justify-center">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Both
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel className='font-bold'>Deographics</FormLabel>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className='mt-1'>
                  <FormLabel>Gender<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <SelectInput
                      placeholder="Gender..."
                      isClearable={false}
                      isSearchable={true}
                      name="gender"
                      value={genderOptions.filter(v => v.value === field.value)[0]}
                      options={genderOptions}
                      onChange={(e) => setValue("gender", e ? e.value : "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className='mt-1 space-y-4'>
                  <FormLabel>Age<span className='text-red-900'>*</span></FormLabel>
                  <FormControl>
                    <div className='flex items-center'>
                      <Checkbox
                        id="ageAll"
                        className='mr-2'
                        checked={form.watch("age") === '0'}
                        onCheckedChange={() => {
                          setValue("age", form.watch("age") === '0' ? '18,55' : '0')
                        }}
                      />
                      <FormLabel>ALL</FormLabel>
                      {form.watch("age") !== "0" && <>
                        <Nouislider
                          start={form.watch("age").split(",")}
                          direction="ltr"
                          orientation='horizontal'
                          tooltips={[
                            wNumb({ decimals: 0 }),
                            wNumb({ decimals: 0 })
                          ]}
                          range={{
                            min: 1,
                            max: 100
                          }}
                          style={{
                            height: '1rem',
                            marginLeft: '1rem'
                          }}
                          className='w-full'
                          onSlide={(value) => setValue("age", value.map(v => parseInt(v)).join(","))}
                          connect
                        />
                      </>}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AudienceTargeting form={form} />
        </div>
      </div>
      <CardFooter className='flex items-center justify-between mt-5 p-0'>
        <Button type='button' onClick={() => router.push(isAdmin ? '/campaign-manager' : '/campaigns')}><X size={14} className='mr-2' /> CANCEL</Button>
        <div className='flex gap-2'>
          <Button type='button' onClick={() => prev()}><ArrowLeft size={14} className='mr-1' /> PREVIOUS</Button>
          <Button type='button' onClick={() => next()}>NEXT<ArrowRight size={14} className='ml-1' /></Button>
        </div>
      </CardFooter>
    </Card>
  )
}