import { hentaiIMeanFixTheUrl } from "./hentai";
import Elysia from 'elysia';
import cors from '@elysiajs/cors';
import * as v from 'valibot';
import { VoeExtractor } from "./extractors/voe";

const hentai = async (iframeId: string) => {
    const baseurl = 'https://megamax.me/iframe';
    const url = `${baseurl}/${iframeId}`;

    const res = await fetch(url, {
        headers: {
                    'X-Requested-With': 'XMLHttpRequest',
        'X-Inertia': 'true',
        'X-Inertia-Version': 'd98bcc9c79d1c5ff36a86cc41dfcd275',
        'X-Inertia-Partial-Data': 'streams',
        'X-Inertia-Partial-Component': 'files/mirror/video',
        'Cookie': 'XSRF-TOKEN=eyJpdiI6InlXVXdFM2piV0tEOG5UaG5BK25odnc9PSIsInZhbHVlIjoiYXZLRTAzbkZhQVhXZUhkRzk0UlNYaXE1UEw0eDFOWEpoT0tZOU95UlRDcHdLSTRsTHc4OUtGUXQ5QUxyYmRGYjJhT3AyNjdURENuTkJvQld1VVhvMjdPZ3llNmU5UC9veHR0UzZNQzd5TDJUSG42bytWRXNOblNPbjBnUHByT3YiLCJtYWMiOiI3NmUzZjNmN2ZiODQ0Njc1NzE1ZDg3ODJiZjdhZWRmYzAyZTU2YjcxODlkNjYxMzg3YmIzMTc0NWVlMjM5ZjcwIiwidGFnIjoiIn0%3D; media-session=eyJpdiI6InlFb1RhQ3c3V3lZR05qVzlTcWRjaUE9PSIsInZhbHVlIjoiazAycDdPNjZxUzV3cXdDZ0NUR3VJcWxPMkgrbEtYM2duZ1pvWTR1UnRxSm1LWFRvTmhVNEg2VTVXSlpVSjIycTc1QlFSbjlZbGZXNjBLS1VrNmpDMlZ3b01OL1E5Q201dVpQTlpQWC90SEN0TzA0Y1dQdCsrbmdvMmJTN3FoRnkiLCJtYWMiOiI0NTZkZWQ5YWU0MGU0YTQ2Y2Q2YjY5NGVhMmRhZDlkZTI5OTlmNmY2NDVlZWZlOTJjOTQzYjNjNmRlNjAzOTE4IiwidGFnIjoiIn0%3D',
        'X-Inertia-Except-Once-Props': 'video,config,ads',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0',
        'X-XSRF-TOKEN': 'eyJpdiI6InlXVXdFM2piV0tEOG5UaG5BK25odnc9PSIsInZhbHVlIjoiYXZLRTAzbkZhQVhXZUhkRzk0UlNYaXE1UEw0eDFOWEpoT0tZOU95UlRDcHdLSTRsTHc4OUtGUXQ5QUxyYmRGYjJhT3AyNjdURENuTkJvQld1VVhvMjdPZ3llNmU5UC9veHR0UzZNQzd5TDJUSG42bytWRXNOblNPbjBnUHByT3YiLCJtYWMiOiI3NmUzZjNmN2ZiODQ0Njc1NzE1ZDg3ODJiZjdhZWRmYzAyZTU2YjcxODlkNjYxMzg3YmIzMTc0NWVlMjM5ZjcwIiwidGFnIjoiIn0='
        }
    });

    const data = await res.json() as {
        component: string;
        props: {
            streams: {
                status: string;
                msg: string;
                token: string;
                data: {
                    hashId: string;
                    label: string;
                    resolution: string;
                    size: number;
                    mirrors: {
                        driver: string;
                        link: string;
                        uploaded_at: string;
                        checked_at: string;
                    }[]
                }[]
            }
        }
        url: string;
        version: string;
        clearHistory: boolean;
        encryptHistory: boolean;
    }

    const iframeUrls = data.props.streams.data.map((d) => ({
        resolution: d.resolution,
        size: d.size,
        label: d.label,
        frames: d.mirrors.map((m) => ({
            url: hentaiIMeanFixTheUrl(m.link),
            server: m.driver
        }))
    }))

    return iframeUrls
} 

export const extractVoe = async (url: string) => {
    const embedResponse = await fetch(url);
    const embedData = await embedResponse.text();

    let sources: string | null = null;

    const regex =  /window\.location\.href\s*=\s*(['"])(.*?)\1/g;
          let match;
      const results: string[] = [];

      while ((match = regex.exec(embedData)) !== null) {
        if (!match[2]) throw new Error('Error fetching Voex.');
        results.push(match[2]);
      }

      const voexUrl = results[0];
      if (!voexUrl) throw new Error('Could not find voex url.');
      const voexResponse = await fetch(voexUrl)
      const voexData = await voexResponse.text();
      sources = VoeExtractor.getSources(voexData);

      return {
        sources,
        isM3U8: sources?.includes('.m3u8'),
        headers: {
            Referer: 'no shitty refer available'
        }
      }
}

export default new Elysia().use(cors()).get('/iframe-urls', async ({ query }) => {
    const { iframe_id } = query;
    const urls = await hentai(iframe_id);

    return {
        message: 'Successfully extracted haram haram data :D',
        data: urls
    }
}, {
    query: v.object({
        iframe_id: v.string('Iframe Id is required and it must be a base64 encoded string')
    })
})
.get('/extract-frame', async ({ query }) => {
    const { server, iframeUrl } = query;

    if (server === 'voe') {
        const sources = await extractVoe(decodeURIComponent(iframeUrl));

        return {
            message: 'Successfully extracted hentai sources- i mean anime sources frfr',
            data: sources
        }
    }
}, {
    query: v.object({
        server: v.string(),
        iframeUrl: v.string()
    })
})
.listen(3000);