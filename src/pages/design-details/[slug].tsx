import * as React from 'react'
import { NextSeo } from 'next-seo'
import Page from '~/components/Page'
import designDetailsPosts from '~/data/appDissections'
import DesignDetailView from '~/components/DesignDetailView'
import { DesignDetailsPost } from '~/data/appDissections'
import { useRouter } from 'next/router'

interface Props {
  post: DesignDetailsPost
}

export default function DesignDetail({ post }: Props) {
  const router = useRouter()

  React.useEffect(() => {
    // handle bad slug
    if (!post) {
      router.push('/design-details')
    }
  }, [])

  if (post) {
    return (
      <Page withHeader>
        <NextSeo
          title={`${post.title} · App Dissection`}
          description={post.description}
          openGraph={{
            url: `https://brianlovin.com/design-details/${post.slug}`,
            title: post.title,
            description: post.description,
            site_name: 'App Dissection',
          }}
        />
        <DesignDetailView post={post} />
      </Page>
    )
  }

  return null
}

export async function getStaticPaths() {
  const paths = designDetailsPosts.map(({ slug }) => ({
    params: { slug },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      post: designDetailsPosts.find((post) => post.slug === slug),
    },
  }
}
