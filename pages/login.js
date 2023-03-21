import React, { useState } from "react"
import Link from "next/link"
import Layout from "../components/Layout"
import Head from "next/head"
import { getCurrentUser, handleLogin } from "../util/storage"
import { useRouter } from "next/router"
import { isLoggedIn } from "../util/storage"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

export default function LoginPage() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    siteName: Yup.string().required(`Site Name is required`),
    siteAPI: Yup.string().required(`API Key is required`),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

  const siteName = getCurrentUser().siteName
  const siteAPI = getCurrentUser().siteAPI
  const [siteNameState, setSiteNameState] = useState(siteName)
  const [siteAPIState, setSiteAPIState] = useState(siteAPI)
  const { register, setError, formState } = useForm(formOptions)
  const { errors } = formState
  const router = useRouter()

  if (isLoggedIn()) {
    router.push(`/`)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({
      siteName: siteNameState,
      siteAPI: siteAPIState,
    })
    router.push(`/`)
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <form
          className={`form`}
          method="post"
          onSubmit={(event) => {
            handleSubmit(event)
            //navigate(`/`)
          }}
        >
          <div className="form-group">
            <label className="label block" htmlFor="siteName">
              Site URL
            </label>
            <input
              {...register(`siteName`)}
              className="form-control"
              type="text"
              name="siteName"
              value={siteNameState}
              onChange={(event) => setSiteNameState(event.target.value)}
              required
            />
            {errors.siteName?.message && <div className="mt-2 text-sm text-red-600 ">{errors.siteName?.message}</div>}
          </div>
          <div className="form-group pb-4">
            <label className="label block" htmlFor="siteAPI">
              API Key
            </label>
            <textarea
              {...register(`siteAPI`)}
              className="form-control"
              type="text"
              name="siteAPI"
              value={siteAPIState}
              onChange={(event) => setSiteAPIState(event.target.value)}
              required
            />
            {errors.siteAPI?.message && <div className="mt-2 text-sm text-red-600 ">{errors.siteAPI?.message}</div>}
          </div>
          <button disabled={formState.isSubmitting} className="btn w-full btn-primary" type="submit">
            log In
          </button>
        </form>

        <p className="pt-2">
          <Link href="/about/" className="underline">
            What is this?
          </Link>
        </p>
      </Layout>
    </>
  )
}
