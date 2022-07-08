# Yarn Version Manager

```console
$ /Users/yeshu/Coding/Personal/website/node_modules/.bin/tsc
src/components/Gallery/index.tsx:13:6 - error TS2786: 'Masonry' cannot be used as a JSX component.
  Its instance type 'Component<MasonryPropTypes, any, any>' is not a valid JSX element.
    The types returned by 'render()' are incompatible between these types.
      Type 'React.ReactNode' is not assignable to type 'import("/Users/yeshu/Coding/Personal/website/node_modules/@types/react-router-config/node_modules/@types/react/index").ReactNode'.
        Type '{}' is not assignable to type 'ReactNode'.

13     <Masonry options={masonryOptions}>
        ~~~~~~~

Found 1 error in src/components/Gallery/index.tsx:13

error Command failed with exit code 2.
```

yarn.lock

```yarn.lock
"@types/react@*":
  version "18.0.14"
  resolved "https://registry.yarnpkg.com/@types/react/-/react-18.0.14.tgz#e016616ffff51dba01b04945610fe3671fdbe06d"
  integrity sha512-x4gGuASSiWmo0xjDLpm5mPb52syZHJx02VKbqUKdLmKtAwIh63XClGsiTI1K6DO5q7ox4xAsQrU+Gl3+gGXF9Q==
  dependencies:
    "@types/prop-types" "*"
    "@types/scheduler" "*"
    csstype "^3.0.2"

"@types/react@17.0.47":
  version "17.0.47"
  resolved "https://registry.yarnpkg.com/@types/react/-/react-17.0.47.tgz#4ee71aaf4c5a9e290e03aa4d0d313c5d666b3b78"
  integrity sha512-mk0BL8zBinf2ozNr3qPnlu1oyVTYq+4V7WA76RgxUAtf0Em/Wbid38KN6n4abEkvO4xMTBWmnP1FtQzgkEiJoA==
  dependencies:
    "@types/prop-types" "*"
    "@types/scheduler" "*"
    csstype "^3.0.2"
```

Solution: package.json

```json
"resolutions": {
    "@types/react": "17.0.47"
},
```
