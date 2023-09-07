'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '../../../button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../form'
import { Input } from '../../../input'
import { Textarea } from '../../../textarea'
import { toast } from '../../../use-toast'
import { useAuthContext } from '../../../../../../lib/firebase/context/AuthContext'

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters.',
    })
    .max(20, {
      message: 'Username must not be longer than 20 characters.',
    }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I love building products.',
  urls: [
    { value: 'https://www.linkedin.com/in/Anmol-Baranwal/' },
    { value: 'https://twitter.com/Anmol_Codes' },
    { value: 'https://github.com/Anmol-Baranwal' },
  ],
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  const { user } = useAuthContext()

  async function onSubmit(data: ProfileFormValues) {
    console.log({ data })

    try {
      const response = await fetch(`/api/updateUserDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.uid,
          username: data.username,
          bio: data.bio,
          urls: data.urls,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Profile updated successfully',
          description: (
            <div className="mt-2 w-[340px] rounded-md bg-foreground p-4 text-background">
              Your profile details have been updated.
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
              There was a problem updating your details.
            </div>
          ),
        })
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="uiverse" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 15 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {/* You can <span>@mention</span> other users and organizations to
                link to them. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    Profile Social Links
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add your social media profiles so others can connect with
                    you.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
