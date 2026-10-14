const ENDPOINT = 'https://buttondown.com/api/emails/embed-subscribe/brucetravis'

export async function subscribe(email: string): Promise<void> {
    // send data to a web address
    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email })
    })
    if (!res.ok) throw new Error('Subscribe failed')
}