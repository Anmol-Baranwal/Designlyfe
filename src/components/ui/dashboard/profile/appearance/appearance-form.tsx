'use client'

import { zodResolver } from '@hookform/resolvers/zod'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// import { cn } from '@/lib/utils'
import { Button } from '../../../button'
// import { buttonVariants } from '../../../button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../form'
import { RadioGroup, RadioGroupItem } from '../../../radio-group'
import { toast } from '../../../use-toast'
import { useAuthContext } from '../../../../../../lib/firebase/context/AuthContext'
import { useTheme } from 'next-themes'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
  // font: z.enum(['inter', 'manrope', 'system'], {
  //   invalid_type_error: 'Select a font',
  //   required_error: 'Please select a font.',
  // }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

const defaultValues: Partial<AppearanceFormValues> = {
  theme: 'light',
}

export function AppearanceForm() {
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  const { user } = useAuthContext()
  const { setTheme } = useTheme()

  async function onSubmit(data: AppearanceFormValues) {
    try {
      const response = await fetch(`/api/updateUserDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.uid,
          theme: data.theme,
        }),
      })

      if (response.ok) {
        setTheme(data.theme)
        toast({
          title: 'Theme Preference updated successfully',
          description: (
            <div className="mt-2 w-[340px] rounded-md bg-foreground p-4 text-background">
              Your theme preference has been updated.
            </div>
          ),
        })
      } else {
        console.error('Error updating profile:', response.status)

        toast({
          // variant: 'destructive',
          title: 'Uh Oh! Something went wrong',
          description: (
            <div className="mt-2 w-[340px] rounded-md bg-foreground p-4 text-background">
              There was a problem updating your theme preference.
            </div>
          ),
        })
      }
    } catch (error) {
      console.error('Error updating theme preference:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="font"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[200px] appearance-none bg-transparent font-normal'
                    )}
                    {...field}
                  >
                    <option value="inter">Inter</option>
                    <option value="manrope">Manrope</option>
                    <option value="system">System</option>
                  </select>
                </FormControl>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-3 top-2.5 h-4 w-4 opacity-50"
                />
              </div>
              <FormDescription>
                Set the font you want to use in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type="submit">Update preferences</Button>
      </form>
    </Form>
  )
}
