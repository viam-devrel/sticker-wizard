<script lang="ts">
import cx from 'classnames';
import LED from '$lib/assets/led.png'

export let text: string;
export let isSelected: boolean;
  
</script>

<div class={cx(
    "flex gap-2 leading-none px-2", 
    { "bg-white/[.33]": isSelected },
)}>
  <img src={LED} alt="led bullet" class="size-fit pt-[3.5px]">
  {text}
</div>