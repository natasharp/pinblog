import React from 'react'
import { makeStyles } from '@material-ui/core'
import BlogCard from './BlogCard';
import Masonry from 'react-masonry-css'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    gridStyle: {
        paddingTop: 8
    },
    masonryGridStyle: {
        display: "flex",
        marginLeft: -30,
        paddingLeft: 20,
        width: "auto",
    },
    masonryGridColumnStyle: {
        paddingLeft: 10,
        backgroundClip: "padding-box"
    },
    masonryGridRowStyle: {
        marginBottom: 10
    }
});

const BlogCollection = ({ blogs, user }) => {
    const classes = useStyles()

    const sortBlogs = blogs => (
        blogs.sort((first, second) => (first.likes >= second.likes) ? -1 : 1)
    )

    const breakpoint = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <Masonry
            breakpointCols={breakpoint}
            className={classes.masonryGridStyle}
            columnClassName={classes.masonryGridColumnStyle}>
            {sortBlogs(blogs).map(blog =>
                <div className={classes.masonryGridRowStyle} key={blogs.indexOf(blog)}>
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        user={user} /></div>
            )}
        </Masonry>
    )
}

export default BlogCollection