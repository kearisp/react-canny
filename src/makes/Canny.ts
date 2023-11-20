export type RenderOptions = {
    boardToken: string
    basePath?: string
    user?: {
        id?: any
        email?: any
    }
    ssoToken?: string
    onLoadCallback?: () => void
    theme?: 'dark' | 'light' | 'auto'
}

export type ChangeLogOptions = {
    appID: string
    align: 'top' | 'bottom' | 'left' | 'right'
    position: 'top' | 'bottom' | 'left' | 'right'
    labelIDs?: string[]
}

class Canny {
    canny: any

    constructor(canny: any) {
        this.canny = canny
    }

    render(options: RenderOptions) {
        if (this.canny) {
            this.canny('render', options)
        }
    }

    initChangelog(options: ChangeLogOptions) {
        if (this.canny) {
            this.canny('initChangelog', options)
        }
    }

    closeChangelog() {
        if (this.canny) {
            this.canny('closeChangelog')
        }
    }
}

export { Canny }
