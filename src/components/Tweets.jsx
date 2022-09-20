/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */

import 'linkify-plugin-hashtag'
import 'linkify-plugin-mention'
import Linkify from 'linkify-react'

import { DateTime } from 'luxon'

import { useEffect, useState } from 'react'

export default function Tweets() {
  const [tweets, setTweets] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await fetch(
          'https://api-proxy-eight.vercel.app/tweets/1552701398944473088/6'
        )
        const data = await response.json()
        setTweets(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        console.log(error)
      }
    }
    getTweets()
  }, [])

  const options = {
    rel: 'noopener',
    target: '_blank',
    nl2br: true,
    className: 'tweet-link',
    defaultProtocol: 'https',
    formatHref: {
      hashtag: (href) => `https://twitter.com/hashtag/${href.substr(1)}`,
      mention: (href) => `https://twitter.com${href}`,
    },
  }

  if (error) {
    return <p>hmm, error fetching tweets...</p>
  }

  if (loading) {
    return <p>loading tweets...</p>
  }

  return (
    <div className="tweet-container">
      {tweets?.data.map((tweet) => (
        <div key={tweet.id} className="tweet">
          <Linkify className="tweetBody" tagName="p" options={options}>
            {tweet.text}
          </Linkify>
          <p className="tweet-time">
            {DateTime.fromISO(tweet.created_at)
              .setLocale('de')
              .toLocaleString(DateTime.DATETIME_MED)}
          </p>
        </div>
      ))}
    </div>
  )
}
