import { themed } from '@deity/falcon-ui';

export const ReviewsContainer = themed({
  tag: 'div',
  defaultTheme: {
    container: {
      pl: 'sm',
      pr: 'sm',
      border: 'regular',
      borderColor: 'primaryDark'
    }
  }
});

export const ReviewCard = themed({
  tag: 'div',
  defaultTheme: {
    card: {
      p: 'sm',
      m: 'sm',
      bg: 'secondaryLight'
    }
  }
})

export const ReviewHeader = themed({
  tag: 'div',
  defaultTheme: {
    header: {
      fontSize: 'xs'
    }
  }
})

export const ReviewBody = themed({
  tag: 'div',
  defaultTheme: {
    body: {
      mt: 'sm',
      p: 'xs',
      bg: 'white',
      color: 'primaryDark',
      fontSize: 'xxs'
    }
  }
})

export const Link = themed({
  tag: 'a',
  defaultTheme: {
    link: {
      color: 'primaryDark',
      css: { cursor: 'pointer' }
    }
  }
})
