import { GetStaticProps } from 'next'
import { getPageStaticProps } from '../lib/getPageStaticProps'
import { Page } from '../components/Page'
import React from 'react'

export default Page;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => getPageStaticProps()
