import axios, { AxiosError, AxiosResponse } from "axios"
import { z } from "zod"

const client = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://backend-k745z.ondigitalocean.app/"
})

const _patchMessages = async ( id: string, message: string): Promise<AxiosResponse | null> => {
  try {
    const response = await client.patch(`/api/messages/${id}`, {"message": message})
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

const MessagesSchema = z.object({
  id: z.string(),
})

export type Messages = z.infer<typeof MessagesSchema>

const validateMessages = (response: AxiosResponse): Messages | null => {
  const result = MessagesSchema.safeParse(response.data)
  if (!result.success) {
    return null
  }
  return result.data
}

type Response<Type> = {
  data: Type
  status: number
  success: true
} | {
  status: number
  success: false
}

export const patchMessages = async (id: string, message: string): Promise<Response<Messages>> => {
  const response = await _patchMessages(id, message)
  if (!response)
    return { success: false, status: 0  }
  if (response.status !== 200)
    return { success: false, status: response.status  }
  const data = validateMessages(response)
  if (!data)
    return { success: false, status: response.status  }
  return { success: true, status: response.status, data }
}