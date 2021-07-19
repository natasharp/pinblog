import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import BlogCard from './BlogCard';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    gridStyle: {
        paddingTop: 8
    }
});

const BlogCollection = ({ blogs, user }) => {
    const classes = useStyles()

    const sortBlogs = blogs => (
        blogs.sort((first, second) => (first.likes > second.likes) ? -1 : 1)
    )

    return (
        <Grid
            className={classes.gridStyle}
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start">
            {sortBlogs(blogs).map(blog =>
                <Grid item xs={12} sm={6} md={4} lg={3} key={blogs.indexOf(blog)}>
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        user={user}/></Grid>
            )}
        </Grid>
    )
}

export default BlogCollection