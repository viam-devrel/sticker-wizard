<script lang="ts">
	import { T } from '@threlte/core';
	import { AnimatedSpriteMaterial } from '@threlte/extras';
	import bucketImg from '$lib/assets/bucket.png';
</script>

<T.Sprite scale={[7, 11, 7]} position.y={0.5} position.x={-8}>
	<AnimatedSpriteMaterial textureUrl={bucketImg} totalFrames={1} fps={1} delay={1} />
	<T.PlaneGeometry />
</T.Sprite>
