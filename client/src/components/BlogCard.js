import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardContent, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
  cardStyle: {
    minWidth: 250,
    paddingBottom: 8
  },
  cardContentStyle: {
    paddingBottom: 4,
  }
});

const BlogCard = ({ blog }) => {
  const classes = useStyle()

  return (
    <Card className={classes.cardStyle}>
      <CardContent className={classes.cardContentStyle}>
        <Button component={Link} to={`/blogs/${blog.id}`}>{blog.title}</Button>
      </CardContent>
      <CardContent className={classes.cardContentStyle}>
        {blog.author}
      </CardContent>
      <CardContent className={classes.cardContentStyle}>
      </CardContent>
    </Card>
  )
}

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogCard
