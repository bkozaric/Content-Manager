const RELEASE_MODE = {
    EARLY: 0,
    ALL: 1
};

const HOOK_CHANNEL = {
    TEST: "PLACEHOLDER",
    EARLY: "PLACEHOLDER",
    ALL: "PLACEHOLDER",
    RELEASE_ANNOUNCEMENT: "PLACEHOLDER"
}

export const discordRelease = async (release, rm, sendPopup) => {
    let upscaledAvailable = release.upscaleAvailable === true ? "Yes, [here](https://www.patreon.com/)" : "No";

    //update status in database
    await fetch(`/api/releases/discord/${release._id}&${rm + 1}`)

    //send announcement message if early access
    if (rm === RELEASE_MODE.EARLY) {
        const discordAnnouncementBody = {
            embeds: [
                {
                    title: release.title,
                    description: release.description,
                    author: {
                        name: "New release for Patrons",
                        icon_url: "https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-2/128/man-icon.png"
                    },
                    color: 53380,
                    thumbnail: {
                        url: "https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-2/128/man-icon.png"
                    },
                    image: {
                        url: release.preview.image
                    },
                    fields: [
                        {
                            name: "Upscaled version available?",
                            value: `${upscaledAvailable}`,
                            inline: false
                        },
                        {
                            name: "Access it here",
                            value: `<#665678769771511878>`,
                            inline: false
                        },
                        {
                            name: "Or on Patreon",
                            value: `[Patreon](${release.patreonUrl})`,
                            inline: false
                        }
                    ]
                }
            ]
        };

        await fetch(HOOK_CHANNEL.RELEASE_ANNOUNCEMENT, {
            //await fetch(HOOK_CHANNEL.TEST, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordAnnouncementBody)
        }
        ).then(answer => console.log(answer)).catch(console.err);
    }

    //create release body
    const discordBody = {
        content: "@everyone",
        embeds: [
            {
                title: release.title,
                description: release.description,
                author: {
                    name: "New release",
                    icon_url: "https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-2/128/man-icon.png"
                },
                color: 53380,
                thumbnail: {
                    url: "https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-2/128/man-icon.png"
                },
                image: {
                    url: release.preview.image
                },
                fields: [
                    {
                        name: "Movie by:",
                        value: `[${release.creator.name}](${release.creator.url})`,
                        inline: false
                    },
                    {
                        name: "Voiced actor:",
                        value: `[${release.va.name}](${release.va.url})`,
                        inline: false
                    },
                    {
                        name: "Upscaled version available?",
                        value: `${upscaledAvailable}`,
                        inline: false
                    }
                ]
            }
        ]
    };
    release.downloads.forEach((dl) => {
        discordBody.embeds[0].fields.push({ name: dl.domain, value: `[Download](${dl.url})`, inline: true })
    })

    //send release to channels
    await fetch(rm === RELEASE_MODE.EARLY ? HOOK_CHANNEL.EARLY : HOOK_CHANNEL.ALL, {
        //await fetch(HOOK_CHANNEL.TEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordBody)
    }
    ).then(answer => {
        if (answer.status === 200) {
            sendPopup("Release sucesfully announced on Discord.")
        }
    }).catch(console.err);

}

export const twitterRelease = async (release, sendPopup) => {
    const twitterBody = {
        id: release._id,
        title: release.title,
        downloads: release.downloads,
        va: release.va.tag,
        creator: release.creator.tag ? release.creator.tag : release.creator.url,
        previewVid: release.preview.video
    }

    try {
        await fetch("/api/releases/tweet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(twitterBody)
        }).then(answer => {
            if (answer.status === 200) {
                sendPopup("Twitter/Public status succesfully added to clipboard.")
            }
        }).catch(err => console.log(err));
    }
    catch (err) {
        console.error(err);
    }

}

export const twitterReleaseEarly = async (release, sendPopup) => {
    const twitterBody = {
        id: release._id,
        title: release.title,
        downloads: release.downloads,
        va: release.va.tag,
        creator: release.creator.tag ? release.creator.tag : release.creator.url,
        previewVid: release.preview.video
    }

    try {
        await fetch("/api/releases/tweetEarly", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(twitterBody)
        }).then(answer => {
            if (answer.status === 200) {
                sendPopup("Twitter/Early status succesfully added to clipboard.")
            }
        }).catch(err => console.log(err));
    }
    catch (err) {
        console.error(err);
    }

}

export const patreonRelease = async (release, sendPopup) => {
    const patreonBody = {
        id: release._id,
        title: release.title,
        downloads: release.downloads,
        creator: release.creator,
    }

    try {
        await fetch("/api/releases/patreon", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patreonBody)
        }).then(answer => {
            if (answer.status === 200) {
                sendPopup("Patreon status succesfully added to clipboard.")
            }
        }).catch(err => console.log(err));
    }
    catch (err) {
        console.error(err);
    }

}