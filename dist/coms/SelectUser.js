import { jsx as _jsx } from "react/jsx-runtime";
import { Page } from "./page";
export function SelectUser({ header, top }) {
    return _jsx(Page, { children: "select user" }, void 0);
    /*
    let app = useUqAppBase();
    let [user, setUser] = useState<User>(null);
    let onSearch = async (key: string) => {
        let retUser = await app.userApi.userFromName(key);
        setUser(retUser);
    }
    header = header ?? 'Select user';
    let cnBorder = "border rounded-3 bg-white p-5 mx-auto w-min-20c";
    let vContent: any;
    if (user === null) {
        vContent = null;
    }
    else if (!user) {
        vContent = <div className={cnBorder}><FA name="info-o" className="me-3 text-info" /> No user</div>;
    }
    else {
        let { name, nick, icon } = user;
        vContent = <div className={cnBorder}>
            <div className="d-flex">
                <Image src={icon} className="me-4 w-2-5c h-2-5c" />
                <div>
                    <div><MutedSmall>Name:</MutedSmall> &nbsp; {name}</div>
                    <div><MutedSmall>Nick:</MutedSmall> &nbsp; {nick}</div>
                </div>
            </div>
            <div className="text-center mt-5">
                <ButtonAsync className="btn btn-primary" onClick={() => { nav.returnCall(user); return wait(10000); }}>
                    OK
                </ButtonAsync>
            </div>
        </div>;
    }

    return <Page header={header} back="close">
        <div className="p-3 d-flex align-items-center flex-column">
            <div>{top}</div>
            <div className="mx-auto mb-3">
                <SearchBox className="w-min-20c"
                    onFocus={() => setUser(null)}
                    onSearch={onSearch}
                    placeholder="user account" />
            </div>
            {vContent}
        </div>
    </Page>;
*/
}
//# sourceMappingURL=SelectUser.js.map